import { LightningElement, track } from 'lwc';
import getAccountContactDetails from '@salesforce/apex/Treedemo.getAccountDetails';

export default class DemotreeStruc extends LightningElement {
    gridColumns = [
        {label: 'Account Name', fieldName: 'Name'},
        {label: 'First Name', fieldName: 'FirstName'},
        {label: 'Last Name', fieldName: 'LastName'}
    ];

    gridData;

    connectedCallback() {
        getAccountContactDetails()
        .then(result =>{
            const temp = JSON.parse(JSON.stringify(result));
            for(var i=0; i<temp.length; i++){
                var relatedContacts = temp[i]['Contacts'];
                if(relatedContacts){
                    temp[i]._children = relatedContacts;
                    delete temp[i].Contacts;
                }
            }
            this.gridData = temp;
            console.log('Temp Final Data:-->'+JSON.stringify(this.gridData));
        })
        .catch(error=>{
            console.log(error);
        })
    }

    handlerowselection(event){
        const selectedData = event.detail.selectedRows;
        console.log("Selected Data: -->"+JSON.stringify(selectedData));

        for(var i=0; i<selectedData.length;i++){
            console.log("Selected Data FN: -->"+selectedData[i].FirstName);
            console.log("Selected Data LN: -->"+selectedData[i].LastName);
        }
    }
}