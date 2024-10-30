import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { UserGuard } from './auth/user.guard';
import { UserComponent } from './user/user.component';
import { EditableGridItemsComponent } from './item-functions/editable-grid-items/editable-grid-items.component';
import { GridOrdersComponent } from './admin/grid-orders/grid-orders.component';
import { GridUsersComponent } from './admin/grid-users/grid-users.component';
import { CartComponent } from './user/cart/cart.component';
import { HomeComponent } from './user/home/home.component';
import { CategoryDetailComponent } from './user/category-detail/category-detail.component';
import { OrdersComponent } from './user/orders/orders.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
        
    },
    {
        path:'user',
        component:UserComponent,
        canActivate: [UserGuard] ,
        children:[
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',  // Set 'home' as the default child route
              },
            {
                path:'home',
                component:HomeComponent,
                canActivate: [UserGuard],
                                
                    
                
            },
            { path: 'category/:type', 
              component: CategoryDetailComponent,
              canActivate: [UserGuard],
            },
            {
                path:'orders',
                component:OrdersComponent,
                canActivate: [UserGuard] 
            },
            {
                path:'profile',
                component:GridUsersComponent,
                canActivate: [UserGuard] 
            },
            // {
            //     path:'cart',
            //     component:CartComponent,
            //     canActivate: [UserGuard] 
            // },
        ]
    },
    {
        path:'admin',
        component:AdminComponent,
        canActivate: [UserGuard],
        children:[
            {
                path:'',
                component:EditableGridItemsComponent,
                canActivate: [UserGuard] 
            },
            {
                path:'products',
                component:EditableGridItemsComponent,
                canActivate: [UserGuard] 
            },
            {
                path:'orders',
                component:GridOrdersComponent,
                canActivate: [UserGuard] 
            },
            {
                path:'users',
                component:GridUsersComponent,
                canActivate: [UserGuard] 
            },

        ]
    },
    {
        path:'login',
        component:AuthComponent
    },
   
   
  
];
