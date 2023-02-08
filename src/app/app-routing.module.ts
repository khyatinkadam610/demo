import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuardService } from './login/auth-gaurd';
import { LoginComponent } from './login/login.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { ProductListComponent } from './shopping-kart/product-list/product-list.component';
import { ShoppingKartComponent } from './shopping-kart/shopping-kart.component';
import { ViewDetailsComponent } from './shopping-kart/view-details/view-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path : 'checkout', component:CheckoutComponent},
  {path : 'orders', component:OrderConfirmComponent},
  { path: 'shop', component: ShoppingKartComponent,canActivate:[AuthGuardService]
  // { path:'shop/details',component:ViewDetailsComponent,canActivate:[AuthGuardService]},
  ,children:[
    { path: '', component: ProductListComponent },
    { path: 'details/:id', component: ViewDetailsComponent },
  ]}


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
