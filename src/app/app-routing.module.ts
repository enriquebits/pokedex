import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesComponent } from './core/components/favorites/favorites.component';
import { PokemonListComponent } from './core/components/pokemon-list/pokemon-list.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
    {path: '', redirectTo: 'pokemon-list', pathMatch: 'full'},
    {path: 'pokemon-list', component: PokemonListComponent},
    {path: 'favorites', component: FavoritesComponent}
  ]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
