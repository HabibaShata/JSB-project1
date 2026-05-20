import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { SharedService } from '../../services/shared.service';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SharedModule} from "../../shared.module";
import {IDeletedItemInfo} from "../../interfaces/ishared";


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  standalone: true,
  styleUrls: ['./delete.component.scss'],
  imports:[SharedModule]
})
export class DeleteComponent {

  deletedObject!:IDeletedItemInfo;
  constructor(private _SharedService: SharedService, private _toast: ToastrService,public dialogRef: MatDialogRef<DeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.deletedObject = data;
    console.log(this.deletedObject);
  }

  onDelete(): void {
    this._SharedService
      .onDelete(this.deletedObject.endPoint, this.deletedObject.id)
      .subscribe({
      next: () => {
        this._toast.success('Deleted successfully.');
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this._toast.error(err.error,'Delete failed.');
        console.log(err);
      },
    });
  }

}
