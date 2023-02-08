import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faFireExtinguisher } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, of, pipe } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/login/login.service';
import { CartItemComponent } from './cart-item/cart-item.component';

import { CartService } from './cart.service';
import { CartItem } from './cartItem.model';


// describe('CartService', () => {
//     let service: CartService;
//     const httpClient = jasmine.createSpyObj(['get'], ['pipe']);


//     const mockLoginService = jasmine.createSpyObj(['user']);
//     mockLoginService.user = new BehaviorSubject({
//         id: 1,
//     })

//     //    auth.user.and.returnValue(of({id:1}));
//     let cartItems: CartItem[] = [
//         { id: 1, productId: 1, productName: 'JJK Vol.1', qty: 1, price: 199 },
//         { id: 2, productId: 2, productName: 'JJK Vol.2', qty: 1, price: 199 },
//         { id: 3, productId: 3, productName: 'JJK Vol.3', qty: 1, price: 199 },
//         { id: 4, productId: 4, productName: 'Tshirt', qty: 2, price: 499 }
//     ];
//     httpClient.get.and.returnValue(of(cartItems))
//     // httpClient.pipe.and.returnValue(of(cartItems))
//     // const msgService = jasmine.createSpyObj(['getMsg']);
//     // msgService.getMsg.and.returnValue(of(200));
//     beforeEach(() => {
//         service = new CartService(httpClient, mockLoginService);
//     });

//     it('should be created', () => {
//         expect(service).toBeTruthy();
//     });
// });
describe('CartService', () => {
    const mockLoginService = jasmine.createSpyObj(['user']);
    mockLoginService.user = new BehaviorSubject({
        id: 1,
    })

    let cartItems = [
       { id: 1,product:{id: 1, description:'', name: 'JJK Vol.1', price: 199} } ,
       { id: 2,product:{id: 2, description:'', name: 'JJK Vol.2', qty: 1, price: 199} } ,
       { id: 3,product:{id: 3, description:'', name: 'Anxious People', qty: 1, price: 199} } ,
       { id: 1,product:{id: 1, description:'', name: 'JJK Vol.1', qty: 1, price: 199} }
    ];

    let service: CartService;
    let httptestingControl: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent,CartItemComponent],
            imports: [HttpClientTestingModule],
            providers: [CartService,
                { provide: LoginService, useValue: mockLoginService }],
        });
        service = TestBed.inject(CartService);
        httptestingControl = TestBed.inject(HttpTestingController);
    })

        it('should call getCartItems correctly ', () => {
            service.getCartItems().subscribe(
                (cartItems) => {
                    expect(cartItems).toBeTruthy("cart item does'nt exist");
                    // expect(cartItems.length).toEqual(3, "Incorrect No of items")
                    // console.log(cartItems);
                    
                }
            );
            // console.log(service.userData.id);  
            const req = httptestingControl.expectOne(`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/cart/${service.userData.id}.json`);
            
            
            expect(req.request.method).toEqual("GET");
            req.flush(cartItems);
            httptestingControl.verify();
        });

        it('should call addCartItem correctly ', () => {
            service.addProductToCart({id: 1, description:'', name: 'JJK Vol.1', price: 199,imageUrl:["abc"]}).subscribe(
                (res) => {
                    expect(res).toBeTruthy("cart item does'nt exist");
                    // expect(cartItems.length).toEqual(3, "Incorrect No of items")
                    // console.log(cartItems);
                    
                }
            );
            // console.log(service.userData.id);  
            const req = httptestingControl.expectOne({
                url:`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/cart/${service.userData.id}.json`,
                method:"POST",
                
            });       
            expect(req.request.method).toEqual("POST");
            req.flush(200);
            httptestingControl.verify();
        });
        it('should call delete CartItem correctly ', () => {
            service.deleteCartItem('abc').subscribe(
                (res) => {
                    expect(res).toBeTruthy("cart item does'nt exist");
                    
                    // expect(cartItems.length).toEqual(3, "Incorrect No of items")
                    // console.log(cartItems);
                    
                }
            );
            // console.log(service.userData.id);  
            const req = httptestingControl.expectOne({
                url:`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/cart/${service.userData.id}/abc.json`,
                method:"DELETE",
                
            });       
            expect(req.request.method).toEqual("DELETE");
            req.flush(200);
            httptestingControl.verify();
        });



        it('should place and ordzr ', () => {
            service.placeAnOrder([
                { id: 1, price: 199, qty: 1, firebaseId: ['abc'], product: { id: 1, description: '', imageUrl: [''], name: 'JJK Vol.1', price: 199 } },
                { id: 2, price: 399, qty: 1, firebaseId: ['abc'], product: { id: 2, description: '', imageUrl: [''], name: 'JJK Vol.1', price: 399 } }
            ] ).subscribe(
                (res) => {
                    expect(res).toBeTruthy("cart item does'nt exist");
                    
                    // expect(cartItems.length).toEqual(3, "Incorrect No of items")
                    // console.log(cartItems);
                    
                }
            );
            // console.log(service.userData.id);  
            const req1 = httptestingControl.match({
                url:`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/orders/1.json`,
                
            });       
            expect(req1[0].request.method).toEqual("POST");
            req1[0].flush(200);
            // httptestingControl.verify();

            const req2 = httptestingControl.match({
                url:`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/cart/1.json`,
                
            }); 
            expect(req2[0].request.method).toEqual("DELETE");
            req2[0].flush(200);
            httptestingControl.verify();
        });

        it('should calculate price properly',()=>{
            service.cartItem = [
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
            expect(service.calcCartTotal()).toEqual(1595); 
        })
});