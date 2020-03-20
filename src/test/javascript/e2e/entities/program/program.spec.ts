import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProgramComponentsPage, { ProgramDeleteDialog } from './program.page-object';
import ProgramUpdatePage from './program-update.page-object';
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

describe('Program e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let programComponentsPage: ProgramComponentsPage;
  let programUpdatePage: ProgramUpdatePage;
  let programDeleteDialog: ProgramDeleteDialog;
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

  it('should load Programs', async () => {
    await navBarPage.getEntityPage('program');
    programComponentsPage = new ProgramComponentsPage();
    expect(await programComponentsPage.title.getText()).to.match(/Programs/);

    expect(await programComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([programComponentsPage.noRecords, programComponentsPage.table]);

    beforeRecordsCount = (await isVisible(programComponentsPage.noRecords)) ? 0 : await getRecordsCount(programComponentsPage.table);
  });

  it('should load create Program page', async () => {
    await programComponentsPage.createButton.click();
    programUpdatePage = new ProgramUpdatePage();
    expect(await programUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationApp.program.home.createOrEditLabel/
    );
    await programUpdatePage.cancel();
  });

  it('should create and save Programs', async () => {
    await programComponentsPage.createButton.click();
    await programUpdatePage.programTypeSelectLastOption();
    await programUpdatePage.setStartDateInput('01-01-2001');
    expect(await programUpdatePage.getStartDateInput()).to.eq('2001-01-01');
    const selectedIsActive = await programUpdatePage.getIsActiveInput().isSelected();
    if (selectedIsActive) {
      await programUpdatePage.getIsActiveInput().click();
      expect(await programUpdatePage.getIsActiveInput().isSelected()).to.be.false;
    } else {
      await programUpdatePage.getIsActiveInput().click();
      expect(await programUpdatePage.getIsActiveInput().isSelected()).to.be.true;
    }
    await programUpdatePage.blocksSelectLastOption();
    await waitUntilDisplayed(programUpdatePage.saveButton);
    await programUpdatePage.save();
    await waitUntilHidden(programUpdatePage.saveButton);
    expect(await isVisible(programUpdatePage.saveButton)).to.be.false;

    expect(await programComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(programComponentsPage.table);

    await waitUntilCount(programComponentsPage.records, beforeRecordsCount + 1);
    expect(await programComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Program', async () => {
    const deleteButton = programComponentsPage.getDeleteButton(programComponentsPage.records.last());
    await click(deleteButton);

    programDeleteDialog = new ProgramDeleteDialog();
    await waitUntilDisplayed(programDeleteDialog.deleteModal);
    expect(await programDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jhipsterSampleApplicationApp.program.delete.question/);
    await programDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(programDeleteDialog.deleteModal);

    expect(await isVisible(programDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([programComponentsPage.noRecords, programComponentsPage.table]);

    const afterCount = (await isVisible(programComponentsPage.noRecords)) ? 0 : await getRecordsCount(programComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
