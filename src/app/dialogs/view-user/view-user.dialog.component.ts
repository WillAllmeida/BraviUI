import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@shared/models/user.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Contact } from '@shared/models/contact.model';
import { ContactService } from '@shared/services/contact.service';
import { ContactType, ContactTypeToIcon } from '@shared/enums/contact-type.enum';
import { _isNumberValue } from '@angular/cdk/coercion';

@Component({
    selector: 'app-view-user.dialog',
    templateUrl: '../../dialogs/view-user/view-user.dialog.html',
    styleUrls: ['../../dialogs/view-user/view-user.dialog.css']
})

export class ViewUserDialogComponent implements OnInit {
    @ViewChild('contactsTable') contactsTable: MatTable<any>;

    contactTypes: any[] = [];
    displayedColumns = ['type', 'value', 'actions'];
    dataSource: Array<Contact>;
    isEdit: boolean;

    constructor(public dialogRef: MatDialogRef<ViewUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User,
        private _snackBar: MatSnackBar,
        public contactService: ContactService) {
    }

    formControl = new FormControl('', [
        Validators.required
    ]);

    ngOnInit(): void {
        this.isEdit = false;
        this.dataSource = this.data.contacts;
        Object.keys(ContactType).filter(k => _isNumberValue(Number(k))).forEach(i => this.contactTypes.push({value: Number(i), viewValue: ContactType[Number(i)], icon: ContactTypeToIcon[Number(i)]}));
    }

    onCancel(): void {
        this.dialogRef.close({ success: false, contacts: this.dataSource });
    }

    addContact(): void {
        this.dataSource = [...this.dataSource, {}];
        this.isEdit = true;
    }

    deleteContact(id: number): void {
        this.contactService.deleteContact(id).subscribe(result => {
            let updatedTable = [...this.dataSource.slice(0, -1)];
            if (result) {
                this.dataSource = updatedTable;
            }
        });
    }

    editContact(): void {
        this.isEdit = !this.isEdit;
    }

    saveContact(i: number, contact: Contact): void {
        if (contact.id === undefined) {
            contact.userId = this.data.id;
            this.contactService.addContact(contact).subscribe(
                result => {
                    contact.id = result;
                    this.dataSource[i] = contact;
                    this.data.contacts = this.dataSource;
                    this.isEdit = false;
                    this._snackBar.open(`Contato ${result} adicionado com sucesso`, "X", { duration: 5000, panelClass: 'app-notification-success' });
                },
                error => {
                    this._snackBar.open("Erro ao adicionar contato", "X", { duration: 5000, panelClass: 'app-notification-error' });
                });
        } else {
            this.contactService.updateContact(contact).subscribe(
                result => {
                    this.dataSource[i] = contact;
                    this._snackBar.open(`Contato ${this.data.id} atualizado com sucesso`, "X", { duration: 5000, panelClass: 'app-notification-success' });
                },
                error => {
                    this._snackBar.open("Erro ao atualizar contato", "X", { duration: 5000, panelClass: 'app-notification-error' });
                });
        }
    }
}