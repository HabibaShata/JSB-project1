import {Component, OnInit} from '@angular/core';
import {IFavorite} from "../../../../../shared/interfaces/ishared";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteComponent} from "../../../../../shared/components/delete/delete.component";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {

favoriteList!:IFavorite[];
  pageSize = 3;
  pageIndex = 1;
  length!:number ;
  isLoading:boolean = false;
constructor(private _UserService: UserService, private _Dialog: MatDialog ) {
}

  ngOnInit(): void {

    this.loadFavoriteList(this.pageIndex,this.pageSize);
    }
    loadFavoriteList(pageNumber:number, pageSize:number){
      this.isLoading = true;
      let param={
        pageNumber:pageNumber,
        pageSize:pageSize
      }
      this._UserService.onGetFavorite(param).subscribe({
        next: res => {
          console.log('data', res.data);
          this.favoriteList=res.data;
          this.pageSize=res.pageSize;
          this.pageIndex=res.pageNumber;
          this.length=res.totalNumberOfRecords;
        },
        error: err => {
          console.log(err);
          this.isLoading = false;

        },
        complete: () => {
          this.isLoading = false;

        }
      })

    }

  openDeleteDialog(favoriteItem:IFavorite): void {
    let DialogRef=  this._Dialog.open(DeleteComponent,{
       data: {
       id:favoriteItem.id,
       name:favoriteItem.recipe.name,
        endPoint: 'userRecipe',
    }
    })
    DialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._UserService.removeFavoriteId(favoriteItem.recipe.id);
        this.loadFavoriteList(this.pageIndex,this.pageSize);
      }
    })

    }
  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadFavoriteList(this.pageIndex,this.pageSize);

  }


}
