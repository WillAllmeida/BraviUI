import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@shared/models/user.model';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Contact } from '@shared/models/contact.model';

@Component({
  selector: 'app-view-user.dialog',
  templateUrl: '../../dialogs/view-user/view-user.dialog.html',
  styleUrls: ['../../dialogs/view-user/view-user.dialog.css']
})

export class ViewUserDialogComponent {
    constructor(public dialogRef: MatDialogRef<ViewUserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User,
                private _snackBar: MatSnackBar,
                public userService: UserService) { 
                }
  
    formControl = new FormControl('', [
      Validators.required
    ]);

    onCancel(): void {
        this.dialogRef.close({success: false});
    }

    addContact(): void {
        
    }
  }