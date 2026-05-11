import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CommonModule } from '@angular/common';
import { IRecipes } from 'src/app/shared/interfaces/ishared';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class RecipesComponent implements OnInit {
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
