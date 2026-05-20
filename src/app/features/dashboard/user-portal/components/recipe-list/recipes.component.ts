import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import {ICategory, IRecipes, IRecipesResponse, ITag} from 'src/app/shared/interfaces/ishared';
import {ViewRecipeComponent} from "../view-recipe/view-recipe.component";
import {MatDialog} from "@angular/material/dialog";
import {PageEvent} from "@angular/material/paginator";
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  recipes: IRecipes[] = [];
  categories: ITag[] = [];
  isLoading:boolean = false;
  totalNumberOfRecords: number=0;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions = [5, 10, 25];
  tags: ITag[] = [];
  searchInput:string="";
  selectedTagId: number | null = null;
  selectedCategoryId: number | null = null;

  constructor(private _sharedService: SharedService,public dialog: MatDialog) { }

  ngOnInit() {
    this.loadRecipes();
    this.loadTags();
    this.loadCategories();
  }

  private getNormalizedSearchTerm(): string | undefined {
    const normalizedSearchTerm = this.searchInput.trim().toLowerCase();
    return normalizedSearchTerm || undefined;
  }

  loadRecipes() {
    this.isLoading = true;
    this._sharedService.onGetRecipes(
      this.pageSize,
      this.pageIndex + 1,
      this.getNormalizedSearchTerm(),
      this.selectedTagId ?? undefined,
      this.selectedCategoryId ?? undefined
    ).subscribe({
      next: (res: IRecipesResponse) => {
        this.recipes = res.data;
        this.totalNumberOfRecords = res.totalNumberOfRecords;
        this.pageSize = res.pageSize;
        this.pageIndex = res.pageNumber - 1;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });

  }
  loadTags(): void {
    this._sharedService.onGetAllTags().subscribe({
      next: (res: ITag[]) => {
        this.tags = res;
      },
      error: (err) => {
        console.log("faild to load tags",err.error);
      }
    })
  }
   loadCategories(): void {
    this._sharedService.onGetAllCategory().subscribe({
      next: (res: ICategory) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onFilterByTag(): void {
    this.pageIndex = 0;
    this.loadRecipes();
  }
  onFilterByCategory(): void {
    this.pageIndex = 0;
    this.loadRecipes();
  }

   openViewDialog(recipe: IRecipes) {
      this.dialog.open(ViewRecipeComponent, {
          data: recipe,
          width: '50%',
        });

  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadRecipes();
  }

  onSearch(value: string): void {
    this.searchInput = value.toLowerCase();
    this.pageIndex = 0;
    this.loadRecipes();
  }
}
