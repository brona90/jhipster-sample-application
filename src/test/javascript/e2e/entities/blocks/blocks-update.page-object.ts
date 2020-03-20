import { element, by, ElementFinder } from 'protractor';

export default class BlocksUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipsterSampleApplicationApp.blocks.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  getPageTitle() {
    return this.pageTitle;
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
