import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BlockComponentsPage, { BlockDeleteDialog } from './block.page-object';
import BlockUpdatePage from './block-update.page-object';
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

describe('Block e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let blockComponentsPage: BlockComponentsPage;
  let blockUpdatePage: BlockUpdatePage;
  let blockDeleteDialog: BlockDeleteDialog;
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
    await navBarPage.getEntityPage('block');
    blockComponentsPage = new BlockComponentsPage();
    expect(await blockComponentsPage.title.getText()).to.match(/Blocks/);

    expect(await blockComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([blockComponentsPage.noRecords, blockComponentsPage.table]);

    beforeRecordsCount = (await isVisible(blockComponentsPage.noRecords)) ? 0 : await getRecordsCount(blockComponentsPage.table);
  });

  it('should load create Block page', async () => {
    await blockComponentsPage.createButton.click();
    blockUpdatePage = new BlockUpdatePage();
    expect(await blockUpdatePage.getPageTitle().getAttribute('id')).to.match(/jhipsterSampleApplicationApp.block.home.createOrEditLabel/);
    await blockUpdatePage.cancel();
  });

  it('should create and save Blocks', async () => {
    await blockComponentsPage.createButton.click();
    const selectedIsInProgram = await blockUpdatePage.getIsInProgramInput().isSelected();
    if (selectedIsInProgram) {
      await blockUpdatePage.getIsInProgramInput().click();
      expect(await blockUpdatePage.getIsInProgramInput().isSelected()).to.be.false;
    } else {
      await blockUpdatePage.getIsInProgramInput().click();
      expect(await blockUpdatePage.getIsInProgramInput().isSelected()).to.be.true;
    }
    await blockUpdatePage.setNameInput('name');
    expect(await blockUpdatePage.getNameInput()).to.match(/name/);
    await blockUpdatePage.blocksSelectLastOption();
    await waitUntilDisplayed(blockUpdatePage.saveButton);
    await blockUpdatePage.save();
    await waitUntilHidden(blockUpdatePage.saveButton);
    expect(await isVisible(blockUpdatePage.saveButton)).to.be.false;

    expect(await blockComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(blockComponentsPage.table);

    await waitUntilCount(blockComponentsPage.records, beforeRecordsCount + 1);
    expect(await blockComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Block', async () => {
    const deleteButton = blockComponentsPage.getDeleteButton(blockComponentsPage.records.last());
    await click(deleteButton);

    blockDeleteDialog = new BlockDeleteDialog();
    await waitUntilDisplayed(blockDeleteDialog.deleteModal);
    expect(await blockDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jhipsterSampleApplicationApp.block.delete.question/);
    await blockDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(blockDeleteDialog.deleteModal);

    expect(await isVisible(blockDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([blockComponentsPage.noRecords, blockComponentsPage.table]);

    const afterCount = (await isVisible(blockComponentsPage.noRecords)) ? 0 : await getRecordsCount(blockComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
