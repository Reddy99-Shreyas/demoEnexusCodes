import { LightningElement } from 'lwc';
import getContacts from '@salesforce/apex/recordPickerController.getContacts';

const filter = {
    criteria:[
        {
            fieldPath: 'Industry',
            operator: 'eq',
            value: 'Agriculture'
        },
        {
            fieldPath: 'Type',
            operator: 'eq',
            value: 'Prospect'
        },
    ]
}

const matchingInfo = {
    primaryField: {fieldPath: 'Name'},
    additionalFields: [{fieldPath: 'Phone'}]
}

const columns = [
    {label: 'First Name', fieldName: 'FirstName', Type: 'Text'},
    {label: 'Last Name', fieldName: 'LastName', Type: 'Text'},
    {label: 'Phone', fieldName: 'Phone', Type: 'Phone'}
]

export default class RecordPickerCmp extends LightningElement {

    accId;
    //filter = filter;
    matchingInfo = matchingInfo;
    columnList = columns;
    dataList;
    error;

    ContactsData = false;

    handleChange(event){
        this.accId = event.detail.recordId;
        this.getRelatedContacts();
        this.ContactsData = !this.ContactsData;
    }

    getRelatedContacts(){
        getContacts({accId: this.accId})
        .then((result)=>{
            this.dataList = result;
            console.log('Data: -->' +JSON.stringify(result));
        })
        .catch((error)=>{
            this.error = error;
            console.log('Error: -->' +JSON.stringify(error));
        });
    }
}