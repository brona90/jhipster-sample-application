import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CoreSkillComponentsPage, { CoreSkillDeleteDialog } from './core-skill.page-object';
import CoreSkillUpdatePage from './core-skill-update.page-object';
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

describe('CoreSkill e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let coreSkillComponentsPage: CoreSkillComponentsPage;
  let coreSkillUpdatePage: CoreSkillUpdatePage;
  let coreSkillDeleteDialog: CoreSkillDeleteDialog;
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
    await navBarPage.getEntityPage('core-skill');
    coreSkillComponentsPage = new CoreSkillComponentsPage();
    expect(await coreSkillComponentsPage.title.getText()).to.match(/Core Skills/);

    expect(await coreSkillComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([coreSkillComponentsPage.noRecords, coreSkillComponentsPage.table]);

    beforeRecordsCount = (await isVisible(coreSkillComponentsPage.noRecords)) ? 0 : await getRecordsCount(coreSkillComponentsPage.table);
  });

  it('should load create CoreSkill page', async () => {
    await coreSkillComponentsPage.createButton.click();
    coreSkillUpdatePage = new CoreSkillUpdatePage();
    expect(await coreSkillUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationApp.coreSkill.home.createOrEditLabel/
    );
    await coreSkillUpdatePage.cancel();
  });

  it('should create and save CoreSkills', async () => {
    await coreSkillComponentsPage.createButton.click();
    await coreSkillUpdatePage.coreSkillTypeSelectLastOption();
    await coreSkillUpdatePage.setAbilityInput('5');
    expect(await coreSkillUpdatePage.getAbilityInput()).to.eq('5');
    await coreSkillUpdatePage.setPerscriptionInput('perscription');
    expect(await coreSkillUpdatePage.getPerscriptionInput()).to.match(/perscription/);
    await coreSkillUpdatePage.coreSkillsSelectLastOption();
    await waitUntilDisplayed(coreSkillUpdatePage.saveButton);
    await coreSkillUpdatePage.save();
    await waitUntilHidden(coreSkillUpdatePage.saveButton);
    expect(await isVisible(coreSkillUpdatePage.saveButton)).to.be.false;

    expect(await coreSkillComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(coreSkillComponentsPage.table);

    await waitUntilCount(coreSkillComponentsPage.records, beforeRecordsCount + 1);
    expect(await coreSkillComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last CoreSkill', async () => {
    const deleteButton = coreSkillComponentsPage.getDeleteButton(coreSkillComponentsPage.records.last());
    await click(deleteButton);

    coreSkillDeleteDialog = new CoreSkillDeleteDialog();
    await waitUntilDisplayed(coreSkillDeleteDialog.deleteModal);
    expect(await coreSkillDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationApp.coreSkill.delete.question/
    );
    await coreSkillDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(coreSkillDeleteDialog.deleteModal);

    expect(await isVisible(coreSkillDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([coreSkillComponentsPage.noRecords, coreSkillComponentsPage.table]);

    const afterCount = (await isVisible(coreSkillComponentsPage.noRecords)) ? 0 : await getRecordsCount(coreSkillComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
