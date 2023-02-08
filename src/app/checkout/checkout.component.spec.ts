import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartItem } from '../shopping-kart/cart/cartItem.model';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
    let component: CheckoutComponent;
    let fixture: ComponentFixture<CheckoutComponent>;
    let routerService;
    let cartService;
    let modalService;
    beforeEach(async () => {
        routerService = jasmine.createSpyObj(['navigate']);
        modalService = jasmine.createSpyObj(['open']);
        cartService = jasmine.createSpyObj(['deleteCartItem', 'calcCartTotal', 'getCartItems', 'placeAnOrder']);
        cartService.deleteCartItem.and.returnValue(of([]));
        cartService.getCartItems.and.returnValue(of([]));
        cartService.placeAnOrder.and.returnValue(of(true));
        cartService.calcCartTotal.and.returnValue(598);

        component = new CheckoutComponent(routerService, modalService, cartService);



    });

    it('should delete item on calling onDelete', () => {
        component.cartItems = [
            { id: 1, price: 199, qty: 1, firebaseId: ['abc'], product: { id: 1, description: '', imageUrl: [''], name: 'JJK Vol.1', price: 199 } }
        ];

        component.onDeleteItem(1);
        // component.loadCartItems();
        // console.log("Inside onDelete", component.cartItems);

        expect(component.cartItems.length).toBe(0);
    });
    it('should place an order on calling open', () => {
        component.open([]);        
        expect(component.cartItems.length).toBe(0);
    });
    it('should execute oninit properly', () => {
        component.cartItems = [
            { id: 1, price: 199, qty: 1, firebaseId: ['abc'], product: { id: 1, description: '', imageUrl:[''], name: 'JJK Vol.1', price: 199 } },
            { id: 2, price: 399, qty: 1, firebaseId: ['abc'], product: { id: 2, description: '', imageUrl: [''], name: 'JJK Vol.1', price: 399 } }
        ];

        component.ngOnInit(); 
        expect(component.cartTotal).toBe(598);
    });
});



