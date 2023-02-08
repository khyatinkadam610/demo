import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ShoppingKartComponent } from './shopping-kart/shopping-kart.component';
import { FiltersComponent } from './shopping-kart/filters/filters.component';
import { ProductListComponent } from './shopping-kart/product-list/product-list.component';
import { CartComponent } from './shopping-kart/cart/cart.component';
import { CartItemComponent } from './shopping-kart/cart/cart-item/cart-item.component';
import { ProductItemComponent } from './shopping-kart/product-list/product-item/product-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptorService } from './login/auth-interceptor.service';
import { ViewDetailsComponent } from './shopping-kart/view-details/view-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CarousalComponent } from './shopping-kart/view-details/carousal/carousal.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        ShoppingKartComponent,
        FiltersComponent,
        ProductListComponent,
        CartComponent,
        CartItemComponent,
        ProductItemComponent,
        ViewDetailsComponent,
        CheckoutComponent,
        OrderConfirmComponent,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule,
        NgbModule,
        CommonModule,
        NgbPaginationModule, NgbAlertModule,
        CarousalComponent
    ]
})
export class AppModule { }
