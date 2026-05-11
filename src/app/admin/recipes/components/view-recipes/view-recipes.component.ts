import { Component } from '@angular/core';
import { IRecipes } from 'src/app/shared/interfaces/ishared';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss'],
})
export class ViewRecipesComponent {
  recipes!: IRecipes[];
  constructor(private _sharedService: SharedService) {}
  ngOnInit() {
    this._sharedService.onGetRecipes(10, 1).subscribe({
      next: (res: any) => {
        this.recipes = res.data;
        console.log(this.recipes);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('done');
      },
    });
  }
}
