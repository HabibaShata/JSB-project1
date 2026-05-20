import {Component, OnInit} from '@angular/core';
import {ITag, IUser} from "../../../../shared/interfaces/ishared";
import {PageEvent} from "@angular/material/paginator";
import {CategoryService} from "../categories/services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {DeleteComponent} from "../../../../shared/components/delete/delete.component";
import {AddEditCategoryComponent} from "../categories/components/add-edit-category/add-edit-category.component";
import {UserService} from "./services/user.service";
import {AddEditUserComponent} from "./components/add-edit-user/add-edit-user.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users:IUser[]=[];
  pageNumber:number = 1;
  pageSize:number = 10;
  totalNumberOfRecords:number = 0;
  totalNumberOfPages:number=0;
  pageSizeOptions = [5, 10,15, 25];
  pageIndex = 0;
  pageEvent!: PageEvent;
  handlePageEvent(e: PageEvent) {
    console.log(e)
    this.pageEvent = e;
    this.totalNumberOfRecords = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex+1;
    this.loadAllusers(this.pageIndex, this.pageSize);
  }

  constructor(private _UserService: UserService,private dialog: MatDialog,private toastr:ToastrService) { }
  ngOnInit(): void {
    this.loadAllusers(this.pageNumber,this.pageSize);
  }
  loadAllusers(pageNumber:number, pageSize:number) {
    let param={
      groups:2,
      pageNumber:pageNumber,
      pageSize:pageSize
    }
    this._UserService.onGetAllUsers(param).subscribe({
      next: (res
      )=>{
        this.users=res.data;
        this.totalNumberOfRecords=res.totalNumberOfRecords;
        this.totalNumberOfPages=res.pageNumber;
        console.log(res);
      },
      error: (err)=>{
        console.log(err.error);
      }
    })
  }
  openViewDialog(user:IUser) {
    this.dialog.open(AddEditUserComponent,{
      data:{
        user:user,
        isView:true
      }
    })
  }
  protected openDeleteDialog(user:IUser) {
    let dialogRef= this.dialog.open(DeleteComponent,{
      data:{
        id:user.id,
        name:user.userName,
        endPoint: 'Users',
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);

      if (!result) {
        return;
      }
      this.loadAllusers(this.pageNumber,this.pageSize);

    })
  }


}
