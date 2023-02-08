import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './data-storage.service';

@Component({
  selector: 'app-shopping-kart',
  templateUrl: './shopping-kart.component.html',
  styleUrls: ['./shopping-kart.component.css']
})
export class ShoppingKartComponent implements OnInit {

  constructor(private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.fetchProduct().subscribe();
  }

}
