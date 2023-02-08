import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { CartItemComponent } from './cart-item/cart-item.component';


import { CartComponent } from './cart.component';
import { CartService } from './cart.service';
import { CartItem } from './cartItem.model';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let cartItems: CartItem[];
    

    cartItems = [
        { id: 1, qty: 1, price: 199,firebaseId:['abc'], product:{ id:1,
             name:"naruto",
             description:"peak fiction",
             imageUrl:["abc"],
             price:199}},
        { id: 2, qty: 1, price: 199 ,firebaseId:['bcd'],product:{ id:1,
            name:"naruto",
            description:"peak fiction",
            imageUrl:["abc"],
            price:199}},
        { id: 3, qty: 1, price: 199 ,firebaseId:['cde'],product:{ id:1,
            name:"naruto",
            description:"peak fiction",
            imageUrl:["abc"],
            price:199}},
        { id: 4, qty: 2, price: 499 ,firebaseId:['def'],product:{ id:1,
            name:"naruto",
            description:"peak fiction",
            imageUrl:["abc"],
            price:499}}
    ];
   
   const cartService = jasmine.createSpyObj(['getCartItems','deleteCartItem','calcCartTotal']);
   cartService.getCartItems.and.returnValue(of(cartItems));
   cartService.calcCartTotal.and.returnValue(1595);
   cartService.deleteCartItem.and.returnValue(of('deleted'));
    const msgService = jasmine.createSpyObj(['getMsg']);
    msgService.getMsg.and.returnValue(of(200));
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            declarations: [CartComponent,CartItemComponent],
            imports: [FontAwesomeModule],
            providers: [
                { provide: CartService, useValue: cartService }],

        })
            .compileComponents();

        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        
        fixture.detectChanges();


    });

    it('Should load cart item correctly', () => {

        fixture.detectChanges();
        // component.calcCartTotal();
        expect(component.cartTotal).toBe(1595);
        expect(component.cartItems.length).toBe(4);
    });

    it('Should delete cart item correctly', () => {

        fixture.detectChanges();
        // component.calcCartTotal();
        // component.handleSubscription();
        component.onDeleteItem(1);
        // expect(component.cartTotal).toBe(1595);
        expect(cartService.deleteCartItem).toHaveBeenCalledWith('abc');
    
    });
});
