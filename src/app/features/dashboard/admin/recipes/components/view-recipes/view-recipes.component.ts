import { Component, OnInit } from '@angular/core';
import {  IRecipes } from 'src/app/shared/interfaces/ishared';
import { RecipeService } from '../../../services/recipe.service';
import {MatDialog} from "@angular/material/dialog";
import {DeleteComponent} from "../../../../../../shared/components/delete/delete.component";

@Component({
  selector: 'app-view-recipe-list',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss'],
})
export class ViewRecipesComponent implements OnInit {
  recipes: IRecipes[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  totalRecords = 0;
  totalPages = 0;
  pages: number[] = [];

  constructor(private _RecipeService: RecipeService,public dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadRecipes(this.currentPage);
  }

  loadRecipes(page: number): void {
    this._RecipeService.onGetAllRecipes(this.itemsPerPage, page).subscribe({
      next: (res: any) => {
        this.recipes = res.data;
        this.currentPage = page;
        this.totalRecords = res.totalNumberOfRecords;
        this.totalPages = res.totalNumberOfPages;
        this.pages = Array.from(
          { length: this.totalPages },
          (_, index) => index + 1,
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCurrentPage(page: number): void {
    if (page === this.currentPage || page < 1 || page > this.totalPages) {
      return;
    }

    this.loadRecipes(page);
  }

  goToPreviousPage(): void {
    this.updateCurrentPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    this.updateCurrentPage(this.currentPage + 1);
  }


   openDialog(recipe: IRecipes) {
    console.log(recipe.name);
     const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        id: recipe.id,
        name: recipe.name,
        endPoint: 'Recipe',
      },
     })

     dialogRef.afterClosed().subscribe(result => {
       if (!result) {
         return;
       }

       this.loadRecipes(this.currentPage);
     });
  }



}
