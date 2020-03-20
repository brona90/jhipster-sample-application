import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CoreSkillsComponentsPage, { CoreSkillsDeleteDialog } from './core-skills.page-object';
import CoreSkillsUpdatePage from './core-skills-update.page-object';
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

describe('CoreSkills e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let coreSkillsComponentsPage: CoreSkillsComponentsPage;
  let coreSkillsUpdatePage: CoreSkillsUpdatePage;
  let coreSkillsDeleteDialog: CoreSkillsDeleteDialog;
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

  it('should load CoreSkills', async () => {
    await navBarPage.getEntityPage('core-skills');
    coreSkillsComponentsPage = new CoreSkillsComponentsPage();
    expect(await coreSkillsComponentsPage.title.getText()).to.match(/Core Skills/);

    expect(await coreSkillsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([coreSkillsComponentsPage.noRecords, coreSkillsComponentsPage.table]);

    beforeRecordsCount = (await isVisible(coreSkillsComponentsPage.noRecords)) ? 0 : await getRecordsCount(coreSkillsComponentsPage.table);
  });

  it('should load create CoreSkills page', async () => {
    await coreSkillsComponentsPage.createButton.click();
    coreSkillsUpdatePage = new CoreSkillsUpdatePage();
    expect(await coreSkillsUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationApp.coreSkills.home.createOrEditLabel/
    );
    await coreSkillsUpdatePage.cancel();
  });

  it('should create and save CoreSkills', async () => {
    await coreSkillsComponentsPage.createButton.click();
    await waitUntilDisplayed(coreSkillsUpdatePage.saveButton);
    await coreSkillsUpdatePage.save();
    await waitUntilHidden(coreSkillsUpdatePage.saveButton);
    expect(await isVisible(coreSkillsUpdatePage.saveButton)).to.be.false;

    expect(await coreSkillsComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(coreSkillsComponentsPage.table);

    await waitUntilCount(coreSkillsComponentsPage.records, beforeRecordsCount + 1);
    expect(await coreSkillsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last CoreSkills', async () => {
    const deleteButton = coreSkillsComponentsPage.getDeleteButton(coreSkillsComponentsPage.records.last());
    await click(deleteButton);

    coreSkillsDeleteDialog = new CoreSkillsDeleteDialog();
    await waitUntilDisplayed(coreSkillsDeleteDialog.deleteModal);
    expect(await coreSkillsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationApp.coreSkills.delete.question/
    );
    await coreSkillsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(coreSkillsDeleteDialog.deleteModal);

    expect(await isVisible(coreSkillsDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([coreSkillsComponentsPage.noRecords, coreSkillsComponentsPage.table]);

    const afterCount = (await isVisible(coreSkillsComponentsPage.noRecords)) ? 0 : await getRecordsCount(coreSkillsComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
