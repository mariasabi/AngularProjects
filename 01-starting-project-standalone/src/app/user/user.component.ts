import { Component, EventEmitter, Input,Output,computed, output, signal } from '@angular/core';
import {DUMMY_USERS} from '../dummy-users';
//const randomIndex=Math.floor(Math.random()*DUMMY_USERS.length)
import { type User } from './user.model';
import { CardComponent } from "../shared/card/card.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [CardComponent]
})

// export class UserComponent {
//   selectedUser= signal (DUMMY_USERS[randomIndex]); 
//   imagePath=computed(()=> 'assets/users/'+this.selectedUser().avatar)

//   onSelectUser(){
//     console.log('Clicked');
//     const randomIndex=Math.floor(Math.random()*DUMMY_USERS.length)
//     this.selectedUser.set(DUMMY_USERS[randomIndex]); 
//   }
// }
export class UserComponent {

  @Input({required:true}) user!: User;
  @Input({required:true}) selected!:boolean;
  // avatar= input<string>('demo');
  // avatar= input.required<string>();
  //computed() should be used with signals for defining imagePath
  
  @Output() select= new EventEmitter<string>();
  //@Output() select= new EventEmitter();

  //This doesn't create a signal like input()
  //select=output<string>();

  get imagePath(){
     return 'assets/users/'+ this.user.avatar;
 }

  onSelectUser(){
    this.select.emit(this.user.id);
  }
}
