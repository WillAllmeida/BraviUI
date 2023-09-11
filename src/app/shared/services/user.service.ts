import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "@shared/models/user.model";
import { environment } from '../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
    private apiURL = environment.apiURL;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<Array<User>> {
        return this.http.get<Array<User>>(this.apiURL + 'user', httpOptions);
    }

    deleteUser(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiURL + 'user/' + id, httpOptions);
    }

    addUser(user: User): Observable<number>{
        return this.http.post<number>(this.apiURL + 'user', user, httpOptions);
    }

    updateUser(user: User): Observable<number>{
        return this.http.put<number>(this.apiURL + 'user', user, httpOptions);
    }
}