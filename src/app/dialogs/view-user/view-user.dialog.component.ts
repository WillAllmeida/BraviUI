import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@shared/models/user.model';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Contact } from '@shared/models/contact.model';
import { ContactService } from '@shared/services/contact.service';

@Component({
  selector: 'app-view-user.dialog',
  templateUrl: '../../dialogs/view-user/view-user.dialog.html',
  styleUrls: ['../../dialogs/view-user/view-user.dialog.css']
})

export class ViewUserDialogComponent implements OnInit {

    displayedColumns = ['type', 'value','actions'];
    dataSource: Array<Contact>;
    
    constructor(public dialogRef: MatDialogRef<ViewUserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User,
                private _snackBar: MatSnackBar,
                public contactService: ContactService) { 
                }
  
    formControl = new FormControl('', [
      Validators.required
    ]);

    ngOnInit(): void {
        this.dataSource = this.data.contacts;
    }

    onCancel(): void {
        this.dialogRef.close({success: false, contacts: this.dataSource});
    }

    addContact(): void {
        this.dataSource = [...this.dataSource, {}];
    }

    deleteContact(id: number): void {
        this.contactService.deleteContact(id).subscribe(result => {
            let updatedTable = [...this.dataSource.slice(0, -1)];
            if(result){
                this.dataSource = updatedTable;
            }
        });
    }
  }