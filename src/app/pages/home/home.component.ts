import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/core/services/pokedex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  text: string = '';
  pokemon: any = {};
  favoritesIDS: Array<any> = [];
  favorites: Array<any> = [];
  
  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    this.favoritesIDS = JSON.parse(localStorage.getItem("favorites") || "[]").map(f => f.id);
  }

  textChanged(event: any) {
    this.text = event.target.value;
  }

  doSearch() {
    if (this.text) {
      this.pokedexService.getPokemonByName(this.text)
      .then(pokemon => {
        this.pokemon = pokemon;
        this.pokemon.imageLoaded = false;
        this.pokemon.isFavorite = this.favoritesIDS.includes(this.pokemon.id);
      });
    }
  }

  addToFavorites(pokemon: any) {
    this.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    this.favoritesIDS = this.favorites.map(f => f.id);
    
    if (!pokemon.isFavorite) {
      pokemon.isFavorite = true;
      this.favorites.push(pokemon);
    }
    else {
      pokemon.isFavorite = false;
      const index = this.favoritesIDS.indexOf(pokemon.id, 0);
      if (index > -1) {
        this.favorites.splice(index, 1);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

}
