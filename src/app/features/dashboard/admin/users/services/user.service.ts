import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICategory, IUser, IUserResponse} from "../../../../../shared/interfaces/ishared";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  // add new category  Users/?groups=1&pageSize=10&pageNumber=1
  onAddNewUser(userName:string)  {
    return  this.http.post("Users",{

    });
  }

  //get All Categories
  onGetAllUsers(pram:any)  {
    return  this.http.get<IUserResponse>("Users/",{
      params: pram
    });
  }
  // update Category
  // onEditCategory(id:number,categoryName:string)  {
  //   return  this.http.put<ICategory>(`category/${id}`,{
  //     name : categoryName,
  //   })
  // }
}
