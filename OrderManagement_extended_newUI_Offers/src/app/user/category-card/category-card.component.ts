import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ITEM_TYPES } from '../../constants/item-types';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {

categories=ITEM_TYPES;
constructor(private router:Router,private route:ActivatedRoute){}
@ViewChild('scrollContainer', { read: ElementRef }) scrollContainer!: ElementRef;

selectCategory(type: string): void {
  const currentQueryParams = this.route.snapshot.queryParams;
  this.router.navigate(['/user/category', type],{
    queryParams: currentQueryParams,  
    queryParamsHandling: 'merge'      
  });
  console.log('Selected Category:', type);
  

}
scrollLeft() {
  const cardWidth = 300;
  this.scrollContainer.nativeElement.scrollBy({
    left: -cardWidth,
    behavior: 'smooth'
  });
}

scrollRight() {
  const cardWidth = 300;
  this.scrollContainer.nativeElement.scrollBy({
    left: cardWidth, 
    behavior: 'smooth'
  });
}

}
