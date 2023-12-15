import { LightningElement, wire } from 'lwc';
import fetchSortedData from '@salesforce/apex/serverSortingController.fetchSortedData';

const columns = [
    {label: 'Id', fieldName: 'Id', type: 'text', sortable: true},
    {label: 'Name', fieldName: 'Name', type: 'text', sortable: true},
    {label: 'Amount', fieldName: 'Amount', type: 'Number', sortable: true}
];

export default class ServerSortingCmp extends LightningElement {
    data;
    columns = columns;
    sortedBy = 'Name';
    sortedDirection = 'asc';
    error;

    @wire(fetchSortedData,{sortedBy: '$sortedBy', sortedDirection: '$sortedDirection'})
    wiredData({error, data}){
        if(data){
            this.data = data;
        }else if(error){
            this.error = error;
        }
    }

    handelSort(event){
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
    }
}