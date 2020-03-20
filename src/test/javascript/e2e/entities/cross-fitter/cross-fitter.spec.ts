import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CrossFitterComponentsPage, { CrossFitterDeleteDialog } from './cross-fitter.page-object';
import CrossFitterUpdatePage from './cross-fitter-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('CrossFitter e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let crossFitterComponentsPage: CrossFitterComponentsPage;
  let crossFitterUpdatePage: CrossFitterUpdatePage;
  let crossFitterDeleteDialog: CrossFitterDeleteDialog;
  const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);
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

  it('should load CrossFitters', async () => {
    await navBarPage.getEntityPage('cross-fitter');
    crossFitterComponentsPage = new CrossFitterComponentsPage();
    expect(await crossFitterComponentsPage.title.getText()).to.match(/Cross Fitters/);

    expect(await crossFitterComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([crossFitterComponentsPage.noRecords, crossFitterComponentsPage.table]);

    beforeRecordsCount = (await isVisible(crossFitterComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(crossFitterComponentsPage.table);
  });

  it('should load create CrossFitter page', async () => {
    await crossFitterComponentsPage.createButton.click();
    crossFitterUpdatePage = new CrossFitterUpdatePage();
    expect(await crossFitterUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationApp.crossFitter.home.createOrEditLabel/
    );
    await crossFitterUpdatePage.cancel();
  });

  it('should create and save CrossFitters', async () => {
    await crossFitterComponentsPage.createButton.click();
    await crossFitterUpdatePage.geneticSexSelectLastOption();
    await crossFitterUpdatePage.setGenderIDInput('genderID');
    expect(await crossFitterUpdatePage.getGenderIDInput()).to.match(/genderID/);
    await crossFitterUpdatePage.setPhotoInput(absolutePath);
    await crossFitterUpdatePage.programSelectLastOption();
    await crossFitterUpdatePage.coreSkillsSelectLastOption();
    await waitUntilDisplayed(crossFitterUpdatePage.saveButton);
    await crossFitterUpdatePage.save();
    await waitUntilHidden(crossFitterUpdatePage.saveButton);
    expect(await isVisible(crossFitterUpdatePage.saveButton)).to.be.false;

    expect(await crossFitterComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(crossFitterComponentsPage.table);

    await waitUntilCount(crossFitterComponentsPage.records, beforeRecordsCount + 1);
    expect(await crossFitterComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last CrossFitter', async () => {
    const deleteButton = crossFitterComponentsPage.getDeleteButton(crossFitterComponentsPage.records.last());
    await click(deleteButton);

    crossFitterDeleteDialog = new CrossFitterDeleteDialog();
    await waitUntilDisplayed(crossFitterDeleteDialog.deleteModal);
    expect(await crossFitterDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationApp.crossFitter.delete.question/
    );
    await crossFitterDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(crossFitterDeleteDialog.deleteModal);

    expect(await isVisible(crossFitterDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([crossFitterComponentsPage.noRecords, crossFitterComponentsPage.table]);

    const afterCount = (await isVisible(crossFitterComponentsPage.noRecords)) ? 0 : await getRecordsCount(crossFitterComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
