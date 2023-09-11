import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user.dialog',
  templateUrl: '../../dialogs/edit-user/edit-user.dialog.html',
  styleUrls: ['../../dialogs/edit-user/edit-user.dialog.css']
})
export class EditUserDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: UserService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateUser(this.data).subscribe(
        result => {
            this.data = result;
            this.dialogRef.close({success: true, data: this.data});
        },
        error => {
            this.dialogRef.close({success: false});
        });
  }
}