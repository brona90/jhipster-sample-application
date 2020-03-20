import { element, by, ElementFinder } from 'protractor';

export default class ProgramUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipsterSampleApplicationApp.program.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  programTypeSelect: ElementFinder = element(by.css('select#program-programType'));
  startDateInput: ElementFinder = element(by.css('input#program-startDate'));
  isActiveInput: ElementFinder = element(by.css('input#program-isActive'));
  blocksSelect: ElementFinder = element(by.css('select#program-blocks'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setProgramTypeSelect(programType) {
    await this.programTypeSelect.sendKeys(programType);
  }

  async getProgramTypeSelect() {
    return this.programTypeSelect.element(by.css('option:checked')).getText();
  }

  async programTypeSelectLastOption() {
    await this.programTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  getIsActiveInput() {
    return this.isActiveInput;
  }
  async blocksSelectLastOption() {
    await this.blocksSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async blocksSelectOption(option) {
    await this.blocksSelect.sendKeys(option);
  }

  getBlocksSelect() {
    return this.blocksSelect;
  }

  async getBlocksSelectedOption() {
    return this.blocksSelect.element(by.css('option:checked')).getText();
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
