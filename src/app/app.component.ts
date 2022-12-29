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
    selectedFederalPrograms: [],
    selectedStatePrograms: [],
    incomePeriod: 2,
    incomeRate: 27000,
    eligible: false,
  }

  // additional variables for styles and calculation
  icons = {faBookOpen, faBuildingColumns, faCheck, faCoins, faPeopleGroup};
  programsList = {
    federal: [
      "SNAP",
      "Medicaid",
      "SSI",
      "Federal Public Housing Assistance",
      "Veterans Pension/Survivor Benefit",
      "Pell Grant in current award year",
      "Free/Reduced Price School Meals",
      "USDA Community Eligible Program Enrollmen",
      "WIC",
      "Tribal Program",
      "Dependent/child eligible for one or more of those programs",
    ],
    state: [
      "Medicaid/Medi-Cal",
      "Low Income Home Energy Assistance Program (LIHEAP)",
      "Supplemental Security Income (SSI)",
      "Federal Public Housing Assistance or Section 8",
      "CalFresh, Food Stamps or Supplemental Nutrition Assistance Program (SNAP)",
      "Women, Infants and Children Program (WIC)",
      "National School Lunch Program (NSL)",
      "Temporary Assistance for Needy Families (TANF)",
      "Tribal TANF",
      "Bureau of Indian Affairs General Assistance",
      "Head Start Income Eligible (Tribal Only)",
      "Food Distribution Program on Indian Reservations",
      "Federal Veterans and Survivors Pension Benefit Program",
    ],
  }
  incomeList = {
    state: new Map([
      [1, 28700],
      [2, 28700],
      [3, 33300],
      [4, 40600],
      [5, 47900],
      [6, 55200],
      [7, 62500],
      [8, 69800],
      [9, 77100],
      [10, 84400],
    ]),
    federal: new Map([
      [0, [9440, 10860, 11800]],
      [1, [27180, 31260, 33980]],
      [2, [36620, 42120, 45780]],
      [3, [46060, 52980, 57580]],
      [4, [55500, 63840, 69380]],
    ]),
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
      this.fields.eligible = false;
      this.currentStep = Steps.Result
      this.steps.programs = StepState.Skipped;
      this.steps.income = StepState.Skipped;
      this.steps.result = StepState.Active;
    } else {
      this.currentStep = Steps.GovPrograms;
      this.steps.programs = StepState.Active;
    }
  }

  goToIncomeStep() {
    if ((this.fields.selectedFederalPrograms.length + this.fields.selectedStatePrograms.length) > 2) {
      this.fields.eligible = true;
      this.currentStep = Steps.Result;
      this.steps.income = StepState.Skipped;
      this.steps.result = StepState.Active;
    } else {
      this.currentStep = Steps.PersonalIncome;
      this.steps.income = StepState.Active;
    }
  }

  goToResultStep() {
    let stateIncomeLimit = this.incomeList.state.get(this.fields.householdMembersCount);
    if (stateIncomeLimit) {
      if (this.fields.incomeRate < stateIncomeLimit) {
        this.fields.eligible = true;
        this.currentStep = Steps.Result;
        this.steps.result = StepState.Active;
        return
      }
    }

    let federalIncomeLimit = 0;
    if (this.fields.householdMembersCount > 4) {
      let period = this.fields.incomePeriod;
      let extraMembers = this.fields.householdMembersCount - 4;
      let maxFederalIncomeLimits = this.incomeList.federal.get(4);
      let increaseFederalIncomeLimits = this.incomeList.federal.get(0);
      if (increaseFederalIncomeLimits && maxFederalIncomeLimits) {
        federalIncomeLimit = maxFederalIncomeLimits[period] + (increaseFederalIncomeLimits[period] * extraMembers);
      }
    } else {
      let federalIncomeLimits = this.incomeList.federal.get(this.fields.householdMembersCount);
      if (federalIncomeLimits) {
        federalIncomeLimit = federalIncomeLimits[0];
      }
    }
    if (this.fields.incomeRate < federalIncomeLimit) {
      this.fields.eligible = true;
      this.currentStep = Steps.Result;
      this.steps.result = StepState.Active;
      return
    }

    this.fields.eligible = false;
    this.currentStep = Steps.Result;
  }

  resetSteps() {
    this.currentStep = Steps.Information;
    this.steps = {
      household: StepState.Disabled,
      programs: StepState.Disabled,
      income: StepState.Disabled,
      result: StepState.Disabled,
    };
    this.fields = {
      householdMembersCount: 1,
      householdMembersBenefit: false,
      selectedFederalPrograms: [],
      selectedStatePrograms: [],
      incomePeriod: 2,
      incomeRate: 27000,
      eligible: false,
    };
  }
}
