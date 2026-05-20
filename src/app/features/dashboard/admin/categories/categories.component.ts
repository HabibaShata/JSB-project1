import {Component, OnInit} from '@angular/core';
import {CategoryService} from "./services/category.service";
import {MatDialog} from "@angular/material/dialog";
import { ITag} from "../../../../shared/interfaces/ishared";
import {DeleteComponent} from "../../../../shared/components/delete/delete.component";
import {AddEditCategoryComponent} from "./components/add-edit-category/add-edit-category.component";
import {ToastrService} from "ngx-toastr";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories:ITag[]=[];
  pageNumber:number = 1;
  pageSize:number = 10;
  totalNumberOfRecords:number = 0;
  totalNumberOfPages:number=0;
  pageSizeOptions = [5, 10, 25];
  pageIndex = 0;
  pageEvent!: PageEvent;
  isLoading:boolean = false;
  handlePageEvent(e: PageEvent) {
    console.log(e)
    this.pageEvent = e;
    this.totalNumberOfRecords = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex+1;
    this.loadCategories(this.pageIndex, this.pageSize);
  }

  constructor(private _CategoryService: CategoryService,private dialog: MatDialog,private toastr:ToastrService) { }
  ngOnInit(): void {
   this.loadCategories(this.pageNumber,this.pageSize);
  }
  loadCategories(pageNumber:number, pageSize:number) {
    let param={
      pageNumber:pageNumber,
      pageSize:pageSize
    }
    this.isLoading = true;
   this._CategoryService.onGetAllCategories(param).subscribe({
     next: (res
     )=>{
       this.categories=res.data;
       this.totalNumberOfRecords=res.totalNumberOfRecords;
       this.totalNumberOfPages=res.pageNumber;
       console.log(res);
     },
     error: (err)=>{
       console.log(err.error);
       this.isLoading = false;
     },
     complete: ()=>{
       this.isLoading = false;
     }
   })
  }

  protected openDeleteDialog(category: ITag) {
  let dialogRef= this.dialog.open(DeleteComponent,{
     data:{
       id:category.id,
       name:category.name,
       endPoint: 'Category',
     }
   })
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);

      if (!result) {
        return;
      }

      this.loadCategories(this.pageNumber,this.pageSize);

    })
  }

  protected openAddDialog() {
    let dialogRef=  this.dialog.open(AddEditCategoryComponent,{
      data:{
        name:"",
        isEdit:false
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);

      if (typeof result !== 'string' || !result.trim()) {
        return;
      }

      this._CategoryService.onAddNewCategory(result).subscribe({
        next: (res) => {
        this.toastr.success(result,"category item added successfully");
        },
        error: (err)=>{
          console.log(err.error);
          this.toastr.error(
            err.error,"category item added failure");

        },
        complete: () => {
          this.loadCategories(this.pageNumber,this.pageSize);

        }
      })
    })
  }
  openEditDialog(category: ITag) {
    console.log(category);
  let dialogRef=  this.dialog.open(AddEditCategoryComponent,{
      data:{
        name:category.name,
        isEdit:true
      }
    })

  dialogRef.afterClosed().subscribe(result=>{
    console.log(result);
    if (typeof result !== 'string' || !result.trim()) {
      return;
    }

    this._CategoryService.onEditCategory(category.id,result).subscribe({
      next: (res) => {
        this.toastr.success(`category ${result} updated successfully`);
      },
      error: (err)=>{
        console.log(err.error);
        this.toastr.error(err.error,`category ${{result}} updated failure`);

      },
      complete: () => {
        this.loadCategories(this.pageNumber,this.pageSize);
      }
    })
  })
  }
  openViewDialog(category: ITag) {
    this.dialog.open(AddEditCategoryComponent,{
      data:{
        name:category.name,
        isView:true
      }
    })
  }
}
