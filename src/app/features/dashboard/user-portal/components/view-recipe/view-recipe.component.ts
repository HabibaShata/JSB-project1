import {Component, Inject, OnInit} from '@angular/core';

import {IRecipes} from "../../../../../shared/interfaces/ishared";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent  implements OnInit {
  receivedRecipe!:IRecipes;
  isLoading:boolean = false;
  constructor(public dialogRef: MatDialogRef<ViewRecipeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  _UserService:UserService,
              private toast:ToastrService,
              ) {
    this.receivedRecipe = data;

  }

  ngOnInit(): void {
    this.loadFavoriteRecipeIds();
  }

  loadFavoriteRecipeIds() {
    this._UserService.loadFavoriteRecipeIds().subscribe();
  }

  isExistFavorite(recipeId: number): boolean {
    return this._UserService.isFavorite(recipeId);
  }

  addToFavorite(recipe:IRecipes){
    if(!this.isExistFavorite(recipe.id)){
      this.isLoading = true;

      this._UserService.onAddToFavorite(recipe.id).subscribe({
        next:(res)=>{
          console.log(res);
          this.toast.success(`${this.receivedRecipe.name} added to Favorite successfully.`);
        },
        error:(err)=>{
          console.log(err);
          this.toast.error(err.error,"failed to add to Favorite.");
          this.isLoading = false;
        },
        complete:()=>{
          this.isLoading = false;
          this.dialogRef.close();
        }
      })
    }

  }

}
