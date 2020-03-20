import { element, by, ElementFinder } from 'protractor';

export default class CrossFitterUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipsterSampleApplicationApp.crossFitter.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  geneticSexSelect: ElementFinder = element(by.css('select#cross-fitter-geneticSex'));
  genderIDInput: ElementFinder = element(by.css('input#cross-fitter-genderID'));
  photoInput: ElementFinder = element(by.css('input#file_photo'));
  programSelect: ElementFinder = element(by.css('select#cross-fitter-program'));
  coreSkillsSelect: ElementFinder = element(by.css('select#cross-fitter-coreSkills'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setGeneticSexSelect(geneticSex) {
    await this.geneticSexSelect.sendKeys(geneticSex);
  }

  async getGeneticSexSelect() {
    return this.geneticSexSelect.element(by.css('option:checked')).getText();
  }

  async geneticSexSelectLastOption() {
    await this.geneticSexSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setGenderIDInput(genderID) {
    await this.genderIDInput.sendKeys(genderID);
  }

  async getGenderIDInput() {
    return this.genderIDInput.getAttribute('value');
  }

  async setPhotoInput(photo) {
    await this.photoInput.sendKeys(photo);
  }

  async getPhotoInput() {
    return this.photoInput.getAttribute('value');
  }

  async programSelectLastOption() {
    await this.programSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async programSelectOption(option) {
    await this.programSelect.sendKeys(option);
  }

  getProgramSelect() {
    return this.programSelect;
  }

  async getProgramSelectedOption() {
    return this.programSelect.element(by.css('option:checked')).getText();
  }

  async coreSkillsSelectLastOption() {
    await this.coreSkillsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async coreSkillsSelectOption(option) {
    await this.coreSkillsSelect.sendKeys(option);
  }

  getCoreSkillsSelect() {
    return this.coreSkillsSelect;
  }

  async getCoreSkillsSelectedOption() {
    return this.coreSkillsSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
