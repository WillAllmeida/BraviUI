import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
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
              @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService,
              private _snackBar: MatSnackBar) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  onCancel(): void {
    this.dialogRef.close({success: false});
  }

  updateUser(): void {
    this.userService.updateUser(this.data).subscribe(
        result => {
            this.data = result;
            this._snackBar.open(`Usuário ${this.data.id} atualizado com sucesso`, "X", {duration: 5000, panelClass: 'app-notification-success'});
            this.dialogRef.close({success: true, data: this.data});        
        },
        error => {
            this._snackBar.open("Erro ao atualizar usuário", "X", {duration: 5000, panelClass: 'app-notification-error'});
            this.dialogRef.close({success: false});
        });
  }
}