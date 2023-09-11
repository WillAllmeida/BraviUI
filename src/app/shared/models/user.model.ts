import { Contact } from '@shared/models/contact.model';

export class User {
    id: number;
    name: string;
    contacts: Contact[];
}