import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IFavoriteResponse, ITag} from "../../../../shared/interfaces/ishared";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private favoriteRecipeIds = new Set<number>();

  loadFavoriteRecipeIds() {
    return this.onGetAllFavorites().pipe(
      tap((res) => {
        this.favoriteRecipeIds.clear();
        res.data.forEach((item) => {
          this.favoriteRecipeIds.add(item.recipe.id);
          console.log(this.favoriteRecipeIds)
        });
      })
    );
  }

  isFavorite(recipeId: number): boolean {
    return this.favoriteRecipeIds.has(recipeId);
  }

  removeFavoriteId(recipeId: number): void {
    this.favoriteRecipeIds.delete(recipeId);
  }

   //add to fav
  constructor(private _http:HttpClient) {
  }
   onAddToFavorite(id:number) {
     return this._http.post(`userRecipe/`,{
       recipeId:id
     }).pipe(
       tap(() => {
         this.favoriteRecipeIds.add(id);
       })
     );
   }

   onGetFavorite(pram:any) {
    return this._http.get<IFavoriteResponse>(`userRecipe/`,{
      params: pram
    });
   }
   onGetAllFavorites() {
    return this._http.get<IFavoriteResponse>(`userRecipe/`);
   }

}
