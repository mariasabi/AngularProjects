import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
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
        canActivate: [UserGuard] 
    },
    {
        path:'login',
        component:AuthComponent
    },
  
  
];
