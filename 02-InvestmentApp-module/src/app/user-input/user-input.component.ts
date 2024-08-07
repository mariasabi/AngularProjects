import { Component} from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
constructor(private investmentService:InvestmentService){}

  enteredInitialInvestment='0';
  enteredAnnualInvestment='0';
  enteredExpectedReturn='5';
  enteredDuration='10';
onSubmit(){
  this.investmentService.calculateInvestmentResults({
    initialInvestment: +this.enteredInitialInvestment,
    duration: +this.enteredDuration,
    expectedReturn: +this.enteredExpectedReturn,
    annualInvestment: +this.enteredAnnualInvestment
  });
}
}
