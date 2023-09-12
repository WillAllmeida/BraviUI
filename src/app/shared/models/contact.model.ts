import { ContactType } from '@shared/enums/contact-type.enum';

export class Contact {
    id?: number;
    value?: string;
    type?: ContactType;
    userId?: number;
}