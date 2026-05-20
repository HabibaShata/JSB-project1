import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {IRecipes, IUser} from "../../../../../../shared/interfaces/ishared";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent  implements OnInit {

  userData!: IUser;
  isEdite: boolean=false;
  isView: boolean=false;
  title: string | undefined;
  btnText: string | undefined;
  previewFiles: File[] = [];
  selectedImageFile: File | null = null;
  originalImageFile: File | null = null;
  receivedRecipe: IRecipes | null = null;
  prefixUrl = 'https://upskilling-egypt.com:3006/';
  imageChanged = false;


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userData = data;
    this.isEdite=data.isEdit;
    this.isView=data.isView;
  }

  ngOnInit(): void {
    if( this.isEdite){
      this.title="Edit";
      this.btnText="Edit";
    }

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
}
