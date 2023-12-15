import { LightningElement, track, wire } from 'lwc';
import getAccContacts from '@salesforce/apex/WrapperDemo.fetchAccountContactDetails';

const columns = [
    {
        label: 'AccountName',
        fieldName: 'AccountLink',
        type: 'url',
        typeAttributes: {
            label: {
                fieldName: 'AccountName'
            },
            target: '_blank'
        }
    },
    { label: 'Type', fieldName: 'type' },
    { label: 'Total Contacts', fieldName: 'totalContacts' },
    { label: 'Address', fieldName: 'billingAdress' },
];

export default class Wrapperclassdemo extends LightningElement {
    @track columns = columns;
    data;
    error;

    @wire(getAccContacts)
    wiredAccountdata({ error, data }) {
        if (data) {
            this.data = data;
            console.log(data);
        } else if (error) {
            this.error = error;
            console.log(error);
        }
    }
}