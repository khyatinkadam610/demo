import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  userData!:any;
  orders :any[]= [];
  constructor(private http:HttpClient,private auth:LoginService) { }

  
  getOrders():Observable<any>{
    this.auth.user.subscribe((user) => {
      this.userData = user;
    })
    return this.http.get<any>(`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/orders/${this.userData.id}.json`)
    .pipe(map((resData:any[])=>{
     return resData;
    }))
  }
}
