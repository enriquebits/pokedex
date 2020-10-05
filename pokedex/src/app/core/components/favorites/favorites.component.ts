import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites : Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  }

}
