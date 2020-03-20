import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BlocksComponentsPage, { BlocksDeleteDialog } from './blocks.page-object';
import BlocksUpdatePage from './blocks-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('Blocks e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let blocksComponentsPage: BlocksComponentsPage;
  let blocksUpdatePage: BlocksUpdatePage;
  let blocksDeleteDialog: BlocksDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Blocks', async () => {
    await navBarPage.getEntityPage('blocks');
    blocksComponentsPage = new BlocksComponentsPage();
    expect(await blocksComponentsPage.title.getText()).to.match(/Blocks/);

    expect(await blocksComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([blocksComponentsPage.noRecords, blocksComponentsPage.table]);

    beforeRecordsCount = (await isVisible(blocksComponentsPage.noRecords)) ? 0 : await getRecordsCount(blocksComponentsPage.table);
  });

  it('should load create Blocks page', async () => {
    await blocksComponentsPage.createButton.click();
    blocksUpdatePage = new BlocksUpdatePage();
    expect(await blocksUpdatePage.getPageTitle().getAttribute('id')).to.match(/jhipsterSampleApplicationApp.blocks.home.createOrEditLabel/);
    await blocksUpdatePage.cancel();
  });

  it('should create and save Blocks', async () => {
    await blocksComponentsPage.createButton.click();
    await waitUntilDisplayed(blocksUpdatePage.saveButton);
    await blocksUpdatePage.save();
    await waitUntilHidden(blocksUpdatePage.saveButton);
    expect(await isVisible(blocksUpdatePage.saveButton)).to.be.false;

    expect(await blocksComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(blocksComponentsPage.table);

    await waitUntilCount(blocksComponentsPage.records, beforeRecordsCount + 1);
    expect(await blocksComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Blocks', async () => {
    const deleteButton = blocksComponentsPage.getDeleteButton(blocksComponentsPage.records.last());
    await click(deleteButton);

    blocksDeleteDialog = new BlocksDeleteDialog();
    await waitUntilDisplayed(blocksDeleteDialog.deleteModal);
    expect(await blocksDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jhipsterSampleApplicationApp.blocks.delete.question/);
    await blocksDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(blocksDeleteDialog.deleteModal);

    expect(await isVisible(blocksDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([blocksComponentsPage.noRecords, blocksComponentsPage.table]);

    const afterCount = (await isVisible(blocksComponentsPage.noRecords)) ? 0 : await getRecordsCount(blocksComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
