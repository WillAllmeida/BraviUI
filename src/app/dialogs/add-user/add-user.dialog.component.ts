import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@shared/models/user.model';
import { Contact } from '@shared/models/contact.model';

@Component({
  selector: 'app-add-user.dialog',
  templateUrl: '../../dialogs/add-user/add-user.dialog.html',
  styleUrls: ['../../dialogs/add-user/add-user.dialog.css']
})

export class AddUserDialogComponent {
    constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User,
                public userService: UserService) { 
                    this.data.contacts = []
                }
  
    formControl = new FormControl('', [
      Validators.required
    ]);
  
    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }
  
    submit() {
    // empty stuff
    }
  
    addContact(){
        this.data.contacts = [...this.data.contacts, {}];
    }

    removeContact(){
        this.data.contacts.pop();
    }

    onNoClick(): void {
      this.dialogRef.close({success: false});
    }
  
    public confirmAdd(): void {
        this.userService.addUser(this.data).subscribe(
            result => {
                this.data.id = result;
                this.dialogRef.close({success: true, data: this.data});
            },
            error => {
                this.dialogRef.close({success: false});
            });
    }
  }