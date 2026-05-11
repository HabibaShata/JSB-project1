import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1
  constructor(private _http: HttpClient) {}

  // get recipes
  onGetRecipes(pageSize: number, pageNumber: number) {
    return this._http.get(
      `Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
  }
}
