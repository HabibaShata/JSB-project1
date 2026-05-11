import { Component } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss'],
  standalone: true,
  imports: [NgxDropzoneModule],
})
export class AddEditRecipeComponent {
  onRemove(_t39: any) {
    throw new Error('Method not implemented.');
  }
  onSelect($event: any) {
    throw new Error('Method not implemented.');
  }
}
