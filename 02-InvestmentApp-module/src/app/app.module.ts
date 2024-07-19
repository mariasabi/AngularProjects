import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserInputModule } from "./user-input/user-input.module";
import { InvestmentResultsComponent } from "./investment-results/investment-results.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgFor, NgIf } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InvestmentResultsComponent,
  ],
  imports: [UserInputModule,BrowserModule,NgFor,NgIf],
  bootstrap:[AppComponent]
})
export class AppModule {}