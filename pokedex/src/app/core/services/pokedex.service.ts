import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private apiSpriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemonByName(name: string) {
    return this.http.get(`${this.apiUrl}${name}`)
      .toPromise()
      .then(pokemon => {
        return {
          id: pokemon["id"],
          name: pokemon["name"],
          sprite: `${this.apiSpriteUrl}${pokemon["id"]}.png`,
        };
      })
      .catch(this.handleError)
  }

  getPokemon(limit: number, offset: number) {
    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .toPromise()
      .then(response => response["results"])
      .then(items => items.map((item: any, idx: number) => {
        const id: number = idx + offset + 1;
        
        return {
          id: id,
          name: item.name,
          sprite: `${this.apiSpriteUrl}${id}.png`,
        };
      }))
      .catch(this.handleError)
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
