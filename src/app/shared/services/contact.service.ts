import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from "@shared/models/contact.model";
import { environment } from '../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContactService {
    private apiURL = environment.apiURL;

    constructor(private http: HttpClient) { }

    deleteContact(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiURL + 'contact/' + id, httpOptions);
    }

    updateContact(contact: Contact): Observable<number>{
        return this.http.put<number>(this.apiURL + 'contact', contact, httpOptions);
    }

    addContact(contact: Contact): Observable<number>{
        return this.http.post<number>(this.apiURL + 'contact', contact, httpOptions);
    }
}