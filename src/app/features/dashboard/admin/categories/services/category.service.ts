import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICategory, ITag} from "../../../../../shared/interfaces/ishared";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  // add new category
  onAddNewCategory(categoryName:string)  {
   return  this.http.post<ITag>("category",{
     name : categoryName,
   });
  }

  //get All Categories
  onGetAllCategories(pram:any)  {
    return  this.http.get<ICategory>("category/",{
      params: pram
    });
  }
  // update Category
  onEditCategory(id:number,categoryName:string)  {
return  this.http.put<ICategory>(`category/${id}`,{
  name : categoryName,
})
  }

}
