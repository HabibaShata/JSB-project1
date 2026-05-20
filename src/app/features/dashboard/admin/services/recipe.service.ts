import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ICategory, IRecipes, IRecipesResponse, ITag} from 'src/app/shared/interfaces/ishared';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }
  // add new recipe
  onAddNewRecipe(data:FormData): Observable<any> {
    return  this.http.post('Recipe/', data);
  }
  // get all recipe-list  Recipe/?pageSize=5&pageNumber=1
  onGetAllRecipes(pageSize:number,pageNumber:number): Observable<IRecipesResponse> {
    return this.http.get<IRecipesResponse>(`Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`);

  }
  //get all Tags
  onGetAllTags():Observable<ITag[]> {
    return this.http.get<ITag[]>("tag/");
  }
  //get all category
  onGetAllCategory():Observable<ICategory>{
    return this.http.get<ICategory>(`category/`);
  }
  // get recipe by id
  onGetRecipeById(id:number): Observable<IRecipes> {
    return this.http.get<IRecipes>(`Recipe/${id}`);
  }
  //update Recipe
  onUpdateRecipe(id: number, data:FormData): Observable<any> {
    return this.http.put(`Recipe/${id}`, data);
  }

}
