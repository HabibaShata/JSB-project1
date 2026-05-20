import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent  implements OnInit {
  name: string;
  isEdite: boolean=false;
  isView: boolean=false;
  title: string | undefined;
  btnText: string | undefined;

 constructor(
   public dialog: MatDialog,
             public dialogRef: MatDialogRef<AddEditCategoryComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any) {
           this.name=data.name;
           this.isEdite=data.isEdit;
           this.isView=data.isView;
 }

  ngOnInit(): void {
   if( this.isEdite){
   this.title="Edit";
   this.btnText="Edit";
   }

    }


}
