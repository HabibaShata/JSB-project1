import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ICategory, IRecipesResponse, ITag, IUser} from "../interfaces/ishared";

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1
  constructor(private _http: HttpClient) {}

  // get recipe-list
  onGetRecipes(pageSize: number, pageNumber: number, name?: string, tagId?: number,categoryId?:number): Observable<IRecipesResponse> {

    let params = new HttpParams()

      .set('pageSize', pageSize)

      .set('pageNumber', pageNumber);

    if (name) {

      params = params.set('name', name);

    }

    if (tagId) {

      params = params.set('tagId', tagId);

    }
    if (categoryId) {

      params = params.set('categoryId', categoryId);

    }
    return this._http.get<IRecipesResponse>('Recipe/', { params });
    // return this._http.get(
    //   `Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    // );
  }

  onDelete(endPoint:string,id:number){
    return this._http.delete(`${endPoint}/${id}`);
  }
  //get all Tags
  onGetAllTags():Observable<ITag[]> {
    return this._http.get<ITag[]>("tag/");
  }
  //get all category
  onGetAllCategory():Observable<ICategory>{
    return this._http.get<ICategory>(`category/`);
  }
  // get current User
  onGetCurrentUser(){
    return this._http.get<IUser>("Users/currentUser");
  }
  // ====== ChangePassword =======
 onChangePassword(data: FormData): Observable<unknown> {
    return this._http.put("Users/ChangePassword", data);
}
}
