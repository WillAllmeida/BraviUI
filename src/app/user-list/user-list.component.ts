import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { User } from "@shared/models/user.model";
import { UserService } from "@shared/services/user.service";
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../dialogs/add-user/add-user.dialog.component';
import { EditUserDialogComponent } from '../dialogs/edit-user/edit-user.dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

@Injectable()
export class UserListComponent implements OnInit {
    @ViewChild('table') myTable: MatTable<any>;

    displayedColumns = ['id', 'name', 'contacts','actions'];
    dataSource: Array<User>;

    constructor(private userService: UserService,
                public dialog: MatDialog,) { }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(){
        this.userService.getUsers().subscribe(users => {
            this.dataSource = users;
        });
    }

    addNew(){ 
        const dialogRef = this.dialog.open(AddUserDialogComponent, {
            data: {user: User }
        });
      
        dialogRef.afterClosed().subscribe(result => {
            if(result.success) {
                this.dataSource = [...this.dataSource, result.data];
            }
        });
    }

    startEdit(i: number, user: User){
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
          data: {id: user.id, name: user.name}
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if(result.success){
                const oldDataSource: User[] = Object.assign([], this.dataSource);
                oldDataSource[i] = result.data;
                this.dataSource = oldDataSource;
            }
        });
    }

    deleteItem(id: number){
        this.userService.deleteUser(id).subscribe(result => {
            let updatedTable = [...this.dataSource.slice(0, -1)];
            if(result){
                this.dataSource = updatedTable;
            }
        });
    }
}
