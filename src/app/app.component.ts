import {Component} from '@angular/core';
import {faBookOpen, faBuildingColumns, faCheck, faCoins, faPeopleGroup} from '@fortawesome/free-solid-svg-icons';

enum Steps {
  Information,
  HouseholdBenefits,
  GovPrograms,
  PersonalIncome,
  Result,
}

enum StepState {
  Disabled,
  Skipped,
  Active,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // enums redeclaration to be available in template
  Steps = Steps;
  StepState = StepState;

  // component variables
  icons = {faBookOpen, faBuildingColumns, faCheck, faCoins, faPeopleGroup};
  currentStep = Steps.Information;
  steps = {
    household: StepState.Disabled,
    programs: StepState.Disabled,
    income: StepState.Disabled,
    result: StepState.Disabled,
  }
  fields = {
    householdMembersCount: 1,
    householdMembersBenefit: false,
  }

  goToStep(step: Steps) {
    this.currentStep = step;
  }

  goToHouseholdsStep() {
    this.currentStep = Steps.HouseholdBenefits;
    this.steps.household = StepState.Active;
  }

  goToProgramsStep() {
    if (this.fields.householdMembersBenefit) {
      this.currentStep = Steps.Result
      this.steps.programs = StepState.Skipped;
      this.steps.income = StepState.Skipped;
      this.steps.result = StepState.Active;
    } else {
      this.currentStep = Steps.GovPrograms;
      this.steps.programs = StepState.Active;
    }
  }
}
