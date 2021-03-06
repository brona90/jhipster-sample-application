import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import crossFitter, {
  CrossFitterState
} from 'app/entities/cross-fitter/cross-fitter.reducer';
// prettier-ignore
import program, {
  ProgramState
} from 'app/entities/program/program.reducer';
// prettier-ignore
import coreSkills, {
  CoreSkillsState
} from 'app/entities/core-skills/core-skills.reducer';
// prettier-ignore
import coreSkill, {
  CoreSkillState
} from 'app/entities/core-skill/core-skill.reducer';
// prettier-ignore
import block, {
  BlockState
} from 'app/entities/block/block.reducer';
// prettier-ignore
import blocks, {
  BlocksState
} from 'app/entities/blocks/blocks.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly crossFitter: CrossFitterState;
  readonly program: ProgramState;
  readonly coreSkills: CoreSkillsState;
  readonly coreSkill: CoreSkillState;
  readonly block: BlockState;
  readonly blocks: BlocksState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  crossFitter,
  program,
  coreSkills,
  coreSkill,
  block,
  blocks,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
