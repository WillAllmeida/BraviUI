import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@shared/models/user.model';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Contact } from '@shared/models/contact.model';
import { ContactType, ContactTypeToIcon } from '@shared/enums/contact-type.enum';
import { _isNumberValue } from '@angular/cdk/coercion';

@Component({
  selector: 'app-add-user.dialog',
  templateUrl: '../../dialogs/add-user/add-user.dialog.html',
  styleUrls: ['../../dialogs/add-user/add-user.dialog.css']
})

export class AddUserDialogComponent implements OnInit {
    contactTypes: any[] = [];

    constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User,
                private _snackBar: MatSnackBar,
                public userService: UserService) { 
                    this.data.contacts = []
                }
  
    formControl = new FormControl('', [
      Validators.required
    ]);

    ngOnInit(): void{
        Object.keys(ContactType).filter(k => _isNumberValue(Number(k))).forEach(i => this.contactTypes.push({value: Number(i), viewValue: ContactType[Number(i)], icon: ContactTypeToIcon[Number(i)]},));
    }
  
    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }
  
    addContact(){
        this.data.contacts = [...this.data.contacts, {}];
    }

    removeContact(){
        this.data.contacts.pop();
    }

    onCancel(): void {
      this.dialogRef.close({success: false});
    }
  
    public confirmAdd(): void {
        this.userService.addUser(this.data).subscribe(
            result => {
                this.data.id = result;
                this._snackBar.open(`Usuário ${this.data.name} e ${this.data.contacts.length} ${this.data.contacts.length == 1 ? "contato adicionado" : "contatos adicionados"} com sucesso`, "X", {duration: 5000, panelClass: 'app-notification-success'});
                this.dialogRef.close({success: true, data: this.data});
            },
            error => {
                this._snackBar.open("Erro ao adicionar usuário", "X", {duration: 5000, panelClass: 'app-notification-error'});
                this.dialogRef.close({success: false});
            });
    }
  }