import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ItemFunctionsComponent } from './item-functions/item-functions.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
        
    },
    {
        path:'user',
        component:UserComponent,
        canActivate: [UserGuard] 
    },
    {
        path:'admin',
        component:AdminComponent,
        canActivate: [AdminGuard] 
    },
    {
        path:'login',
        component:AuthComponent
    },
  
  
];
