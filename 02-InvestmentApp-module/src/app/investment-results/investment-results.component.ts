import { Component, inject, Input } from '@angular/core';
import {NgIf,NgFor,CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';
@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
private investmentService=inject(InvestmentService);
get results(){
  return this.investmentService.resultData;
}
}
