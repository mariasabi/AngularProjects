import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ShortItem } from '../../item.model';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { ItemCardComponent } from '../item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoryCardComponent,ItemCardComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  

}
