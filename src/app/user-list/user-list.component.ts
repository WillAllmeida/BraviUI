import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { User } from "@shared/models/user.model";
import { UserService } from "@shared/services/user.service";
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddUserDialogComponent } from '../dialogs/add-user/add-user.dialog.component';
import { EditUserDialogComponent } from '../dialogs/edit-user/edit-user.dialog.component';
import { ViewUserDialogComponent } from '../dialogs/view-user/view-user.dialog.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})

@Injectable()
export class UserListComponent implements OnInit {
    @ViewChild('table') usersTable: MatTable<any>;

    displayedColumns = ['id', 'name', 'contacts', 'actions'];
    dataSource: Array<User>;

    constructor(private userService: UserService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers().subscribe(users => {
            this.dataSource = users;
        });
    }

    addNew() {
        const dialogRef = this.dialog.open(AddUserDialogComponent, {
            data: { user: User }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.success) {
                this.dataSource = [...this.dataSource, result.data];
            }
        });
    }

    viewUser(i: number, user: User) {
        const dialogRef = this.dialog.open(ViewUserDialogComponent, {
            data: {id: user.id, contacts: JSON.parse(JSON.stringify(user.contacts))}
        });

        const contactChangesEvent = dialogRef.componentInstance.signalEvent.subscribe(result => {
            this.dataSource[i].contacts = result;
        });

        dialogRef.afterClosed().subscribe(result => {
            contactChangesEvent.unsubscribe();
        });
    }

    editUser(i: number, user: User) {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: {id: user.id, name: user.name}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.success) {
                this.dataSource[i] = result.data;
                this.usersTable.renderRows();
            }
        });
    }

    deleteUser(i: number, id: number) {
        this.userService.deleteUser(id).subscribe(result => {
            if (result) {
                this.dataSource.splice(i, 1)
                this.usersTable.renderRows();
                this._snackBar.open(`Usuário ${id} deletado com sucesso`, "X", { duration: 5000, panelClass: 'app-notification-success' });
            }
        },
        error => {
            this._snackBar.open("Erro ao deletar usuário", "X", { duration: 5000, panelClass: 'app-notification-error' });
        });
    }
}
