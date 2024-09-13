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
    queryParams: currentQueryParams,  // Passing the current query params
    queryParamsHandling: 'merge'      // This will merge new query params if needed
  });
  console.log('Selected Category:', type);
  
  // You can now use the selected category for any further action
  // For example, you can call a service, update the view, etc.
}
scrollLeft() {
  const cardWidth = 300;
  this.scrollContainer.nativeElement.scrollBy({
    left: -cardWidth, // Adjust scroll distance
    behavior: 'smooth'
  });
}

scrollRight() {
  const cardWidth = 300;
  this.scrollContainer.nativeElement.scrollBy({
    left: cardWidth, // Adjust scroll distance
    behavior: 'smooth'
  });
}

}
