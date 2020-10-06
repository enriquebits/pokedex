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

  removeFromFavorites(favorite: any) {
    const index = this.favorites.indexOf(favorite, 0);
    if (index > -1) {
      this.favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
  }

}
