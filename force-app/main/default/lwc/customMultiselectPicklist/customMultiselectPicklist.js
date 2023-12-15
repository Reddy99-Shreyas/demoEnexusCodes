import { LightningElement, track } from 'lwc';

export default class CustomMultiselectPicklist extends LightningElement {

    @track availableOptions = [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2' },
        { label: 'Option 3', value: 'Option 3' },
        { label: 'Option 4', value: 'Option 4' },
    ];
    @track selectedOptions = [];

    handleDragStart(){}

    handleDragOver(){}

    handleDropAvailable(){}

    handleDropSelected(){}

}