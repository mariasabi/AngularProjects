import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ItemFunctionsComponent } from './item-functions/item-functions.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
        
    },
    {
        path:'home',
        component:ItemFunctionsComponent,
        canActivate: [AuthGuard] 
    },
    {
        path:'login',
        component:AuthComponent
    },
  
  
];
