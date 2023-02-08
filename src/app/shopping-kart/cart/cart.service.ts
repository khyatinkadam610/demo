import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { Product } from 'src/app/models/product.model';
import { CartItem } from './cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartSub = new Subject<CartItem>();
  data!: string;
  userData!: any;
  cartItem:CartItem[] =[];

  constructor(private http: HttpClient, private auth: LoginService) { }

  getCartItems(): Observable<CartItem[]> {
    this.auth.user.subscribe((user) => {
      this.userData = user;
    })
    return this.http.get<CartItem[]>(`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/cart/${this.userData.id}.json`)
      .pipe(map((resData: any[]) => {

        let cartItems: CartItem[] = []
        for (const key in resData) {

          let productExist = false;
          for (let i in cartItems) {
            if (cartItems[i].product.id === resData[key].id) {
              cartItems[i].firebaseId.push(key);
              cartItems[i].qty++;
              productExist = true;
              break;
            }
          }
          if (!productExist) {
            const product: Product = {
              id: resData[key].id,
              name: resData[key].product.name,
              price: resData[key].product.price,
              description: resData[key].product.description,
              imageUrl: resData[key].product.imageUrl,
            }
            cartItems.push(
              new CartItem(
                resData[key].id, product,1,[key]
              )
            );
          }
        }
        // console.log(cartItems);
        this.cartItem = cartItems;
        return cartItems;

      }))

  }
  addProductToCart(product: Product): Observable<any> {
    this.auth.user.subscribe((user) => {
      this.userData = user;

    })
    const temp = this.http.post(`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/cart/${this.userData.id}.json`, { id: product.id, product: product });
    return temp;
  }

  deleteCartItem(fbId:string):Observable<any>{
    this.auth.user.subscribe((user) => {
      this.userData = user;
    })
        return this.http.delete(`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/cart/${this.userData.id}/${fbId}.json`);
  }

  calcCartTotal() {
    let cartTotal = 0;
    this.cartItem.forEach(item => {
      cartTotal += (item.qty * item.price);
    })
    return cartTotal;
  }

  placeAnOrder(cartItems:CartItem[]):Observable<any>{
    console.log("inside checkout");
    this.auth.user.subscribe((user) => {
      this.userData = user;
    })
    cartItems.forEach((item)=>{
      this.http.post(`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/orders/${this.userData.id}.json`, {...item,OrderDate:Date.now()}).subscribe();
    })
    return this.http.delete(`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/cart/${this.userData.id}.json`);
  }
}