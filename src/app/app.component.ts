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
    incomePeriod: undefined,
    incomeRate: 0,
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

  // todo: remove debug changes
  ngOnInit() {
    this.currentStep = Steps.PersonalIncome;
    this.steps.household = StepState.Skipped;
    this.steps.programs = StepState.Skipped;
    this.steps.income = StepState.Active;
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
      incomePeriod: undefined,
      incomeRate: 0,
      eligible: false,
    };
  }
}
