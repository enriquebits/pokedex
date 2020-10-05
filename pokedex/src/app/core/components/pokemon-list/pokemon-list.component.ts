import { Component, OnInit } from '@angular/core';
import { Pokemon }  from '../../models/pokemon';
import { PokedexService } from '../../services/pokedex.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemon: Pokemon[] = [];
  favoritesIDS: Array<any> = [];
  favorites: Array<any> = [];
  isLoading: boolean = false;
  offset: number = 0;
  
  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    this.favoritesIDS = JSON.parse(localStorage.getItem("favorites") || "[]").map(f => f.id);
    this.loadMore();
  }


  loadMore() {
    this.isLoading = true;

    this.pokedexService.getPokemon(this.pokemon.length, this.pokemon.length*this.offset)
      .then(pokemon => {
        console.log(pokemon);
        pokemon = pokemon.map(p => {
          p.imageLoaded = false;
          p.isFavorite = this.favoritesIDS.includes(p.id);
          return p;
        });
        this.pokemon = this.pokemon.concat(pokemon);
        this.isLoading = false;
        this.offset++;
      })
      .catch(() => {
        this.isLoading = false;
      });
  }

  addToFavorites(pokemon: Pokemon) {
    pokemon.isFavorite = true;
    this.favorites.push(pokemon);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
  
}
