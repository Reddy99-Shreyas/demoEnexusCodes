import { LightningElement, wire, track } from 'lwc';
//import LightningAlert from 'lightning/alert';
import fetchData from '@salesforce/apex/getAccounts.getAllAccounts';

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Industry', fieldName: 'Industry', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Type', fieldName: 'Type', type: 'text' }
];

export default class ComponentProject extends LightningElement {

    accounts;
    @track selectedAccount;
    columns = columns;

    @wire(fetchData)
    wiredData({error,data}){
        if(data){
            this.accounts = data;
            console.log('Data---> '+JSON.stringify(data));
        }else if(error){
            console.log('Error---> '+JSON.stringify(error));
        }
    }

    handleRowClick(event) {
        const accountId = event.detail.row.Id;
        this.selectedAccount = this.accounts.find(account => account.Id === accountId);
    }

    // @track accounts;
    // @track selectedAccount;
    // columns = columns;

    // @wire(getAllAccounts)
    // wiredAccounts({ error, data }) {
    //     if (data) {
    //         this.accounts = data;
    //     } else if (error) {
    //         console.error('Error retrieving accounts:', error);
    //     }
    // }

    // handleRowClick(event) {
    //     const accountId = event.detail.row.Id;
    //     this.selectedAccount = this.accounts.find(account => account.Id === accountId);
    // }

    // async handleAlertClick() {
    //     await LightningAlert.open({
    //         message: 'this is the alert message',
    //         theme: 'error', // a red theme intended for error states
    //         label: 'Error!', // this is the header text
    //     });
    //     //Alert has been closed
    // }
}