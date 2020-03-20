import { element, by, ElementFinder } from 'protractor';

export default class BlockUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipsterSampleApplicationApp.block.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  isInProgramInput: ElementFinder = element(by.css('input#block-isInProgram'));
  nameInput: ElementFinder = element(by.css('input#block-name'));
  blocksSelect: ElementFinder = element(by.css('select#block-blocks'));

  getPageTitle() {
    return this.pageTitle;
  }

  getIsInProgramInput() {
    return this.isInProgramInput;
  }
  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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
