import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ItemFunctionsComponent } from './item-functions/item-functions.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
        
    },
    {
        path:'user',
        component:ItemFunctionsComponent,
        canActivate: [AuthGuard] 
    },
    {
        path:'admin',
        component:AdminComponent,
        canActivate: [AuthGuard] 
    },
    {
        path:'login',
        component:AuthComponent
    },
  
  
];
