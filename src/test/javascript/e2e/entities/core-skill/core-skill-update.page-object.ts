import { element, by, ElementFinder } from 'protractor';

export default class CoreSkillUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipsterSampleApplicationApp.coreSkill.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  coreSkillTypeSelect: ElementFinder = element(by.css('select#core-skill-coreSkillType'));
  abilityInput: ElementFinder = element(by.css('input#core-skill-ability'));
  perscriptionInput: ElementFinder = element(by.css('input#core-skill-perscription'));
  coreSkillsSelect: ElementFinder = element(by.css('select#core-skill-coreSkills'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCoreSkillTypeSelect(coreSkillType) {
    await this.coreSkillTypeSelect.sendKeys(coreSkillType);
  }

  async getCoreSkillTypeSelect() {
    return this.coreSkillTypeSelect.element(by.css('option:checked')).getText();
  }

  async coreSkillTypeSelectLastOption() {
    await this.coreSkillTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setAbilityInput(ability) {
    await this.abilityInput.sendKeys(ability);
  }

  async getAbilityInput() {
    return this.abilityInput.getAttribute('value');
  }

  async setPerscriptionInput(perscription) {
    await this.perscriptionInput.sendKeys(perscription);
  }

  async getPerscriptionInput() {
    return this.perscriptionInput.getAttribute('value');
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
