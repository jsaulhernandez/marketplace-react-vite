import { TypeDocumentModel } from './TypeDocument.model';

export interface CustomerModel {
    id?: number;
    firstName: string;
    secondName?: string;
    firstLastName: string;
    secondLastName?: string;
    dateBirth: string;
    typeDocument: TypeDocumentModel;
    phone?: string;
    terms: number;
}
