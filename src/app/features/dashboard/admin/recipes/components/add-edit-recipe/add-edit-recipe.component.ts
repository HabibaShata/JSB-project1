import { Component, OnInit } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { NgForOf, NgIf } from '@angular/common';
import { ICategory, IRecipes, ITag } from '../../../../../../shared/interfaces/ishared';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss'],
  standalone: true,
  imports: [NgxDropzoneModule, ReactiveFormsModule, RouterLink, NgForOf, NgIf],
})
export class AddEditRecipeComponent implements OnInit {
  tags: ITag[] = [];
  categories: ITag[] = [];
  recipeId: number | null = null;
  previewFiles: File[] = [];
  selectedImageFile: File | null = null;
  originalImageFile: File | null = null;
  receivedRecipe: IRecipes | null = null;
  prefixUrl = 'https://upskilling-egypt.com:3006/';
  imageChanged = false;

  addRecipeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(20),
      Validators.pattern(/^\d+$/),
    ]),
    tagId: new FormControl('', [Validators.required]),
    recipeImage: new FormControl(''),
    categoriesIds: new FormControl([]),
  });

  constructor(
    private recipeService: RecipeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadTags();
    this.loadCategories();

    const routeRecipeId = Number(this.route.snapshot.params['id']);
    if (routeRecipeId) {
      this.recipeId = routeRecipeId;
      this.getRecipeDetails(routeRecipeId);
    }
  }

  get isEditMode(): boolean {
    return this.recipeId !== null;
  }

  onSelect(event: { addedFiles: File[] }): void {
    const selectedFile = event.addedFiles[0];

    if (!selectedFile) {
      return;
    }

    this.selectedImageFile = selectedFile;
    this.previewFiles = [selectedFile];
    this.imageChanged = true;
    this.addRecipeForm.get('recipeImage')?.setValue(selectedFile.name);
  }

  onRemove(file: File): void {
    if (this.selectedImageFile && file === this.selectedImageFile) {
      this.selectedImageFile = null;
      this.imageChanged = false;
      this.addRecipeForm.get('recipeImage')?.reset();
      this.restoreOriginalImagePreview();
    }
  }

  onSaveRecipe(): void {
    if (!this.isEditMode && !this.selectedImageFile) {
      this.toastr.error('Recipe image is required.', 'Validation Error');
      return;
    }

    const recipeFormData = this.buildRecipeFormData();
    const recipeRequest = this.isEditMode
      ? this.recipeService.onUpdateRecipe(this.recipeId as number, recipeFormData)
      : this.recipeService.onAddNewRecipe(recipeFormData);

    recipeRequest.subscribe({
      next: () => {
        this.toastr.success(
          this.isEditMode ? 'Recipe updated successfully.' : 'Recipe added successfully.',
          'Success',
        );
        this.router.navigate(['/dashboard/admin/recipes']);
      },
      error: () => {
        this.toastr.error(
          this.isEditMode
            ? 'Failed to update the recipe. Please try again.'
            : 'Failed to add the recipe. Please try again.',
          this.isEditMode ? 'Update Recipe Failed' : 'Add Recipe Failed',
        );
      },
    });
  }

  getRecipeDetails(id: number): void {
    this.recipeService.onGetRecipeById(id).subscribe({
      next: (res) => {
        this.receivedRecipe = res;
        this.addRecipeForm.patchValue({
          name: res.name,
          description: res.description,
          price: res.price,
          tagId: res.tag.id,
          categoriesIds: res.category.map((cat) => cat.id),
        });

        if (res.imagePath) {
          void this.loadExistingImageAsPreview(res.imagePath);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private loadTags(): void {
    this.recipeService.onGetAllTags().subscribe({
      next: (res: ITag[]) => {
        this.tags = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private loadCategories(): void {
    this.recipeService.onGetAllCategory().subscribe({
      next: (res: ICategory) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private buildRecipeFormData(): FormData {
    const recipeFormData = new FormData();

    Object.entries(this.addRecipeForm.getRawValue()).forEach(([key, value]) => {
      if (value === null || key === 'recipeImage') {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => recipeFormData.append(key, String(item)));
        return;
      }

      recipeFormData.append(key, String(value));
    });

    if (!this.isEditMode || this.imageChanged) {
      recipeFormData.append('recipeImage', this.selectedImageFile as Blob);
    }

    return recipeFormData;
  }

  private async loadExistingImageAsPreview(imagePath: string): Promise<void> {
    try {
      const imageResponse = await fetch(`${this.prefixUrl}${imagePath}`);

      if (!imageResponse.ok) {
        return;
      }

      const imageBlob = await imageResponse.blob();
      const fileName = imagePath.split('/').pop() || 'recipe-image';

      this.originalImageFile = new File([imageBlob], fileName, {
        type: imageBlob.type || 'image/png',
      });

      if (!this.imageChanged) {
        this.previewFiles = [this.originalImageFile];
      }
    } catch (error) {
      console.log(error);
    }
  }

  private restoreOriginalImagePreview(): void {
    if (this.originalImageFile) {
      this.previewFiles = [this.originalImageFile];
      return;
    }

    this.previewFiles = [];
  }

  protected resetForm() {
    this.addRecipeForm.reset();
    this.router.navigate(['/dashboard/admin/recipes']);
  }
}
