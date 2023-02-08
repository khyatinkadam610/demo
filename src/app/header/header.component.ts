import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { ProductService } from '../shopping-kart/product.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown  } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  searchText:string='';
  constructor(private productService:ProductService,private loginService:LoginService) { }
  faShoppingCart = faShoppingCart
  searchTextSub = new Subject<String>();
  ngOnInit(): void {
    // this.searchTextSub.next(this.searchText);
    
      this.loginService.user
      .subscribe( user =>{
          this.isAuthenticated = !!user.email;
          console.log(user," ",this.isAuthenticated);
      });
  
  }
  onLogOut(){
    this.loginService.logout();
    // console.log(this.isAuthenticated);
    
  }

  search(form:NgForm){
    const forms = form.value;
    // this.router.navigate(['/shop/search',forms.search]);
    // console.log(forms);

    this.productService.filterProduct(forms.search?forms.search:'');
    form.reset();
  }

}
