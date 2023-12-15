import { LightningElement, track } from 'lwc';

export default class DatatableWithDropdownFilters extends LightningElement {
    @track data = [
        { Id: '1', Name: 'John', Age: 30 },
        { Id: '2', Name: 'Mark', Age: 25 },
        { Id: '3', Name: 'Michel', Age: 22 },
        { Id: '4', Name: 'Sachin', Age: 20 },
        { Id: '5', Name: 'Rick', Age: 45 },
        // Add more data here
    ];

    @track selectedNameFilters = {};
    @track selectedAgeFilters = {};

    @track nameOptions = [];
    @track ageOptions = [];

    @track filteredData = [...this.data];

    // Add these variables to control filter visibility
    @track nameFilterVisible = false;
    @track ageFilterVisible = false;

    connectedCallback() {
        this.nameOptions = [...new Set(this.data.map((record) => record.Name))].map((name) => ({
            label: name,
            value: name
        }));
        this.ageOptions = [...new Set(this.data.map((record) => record.Age))].map((age) => ({
            label: age.toString(),
            value: age.toString()
        }));
    }

    toggleNameFilter() {
        this.nameFilterVisible = !this.nameFilterVisible;
    }

    toggleAgeFilter() {
        this.ageFilterVisible = !this.ageFilterVisible;
    }

    handleNameFilter(event) {
        const value = event.target.value;
        this.selectedNameFilters[value] = event.target.checked;
    }

    handleAgeFilter(event) {
        const value = event.target.value;
        this.selectedAgeFilters[value] = event.target.checked;
    }

    applyFilters() {
        this.filteredData = this.data.filter((record) =>
            (Object.keys(this.selectedNameFilters).length === 0 || this.selectedNameFilters[record.Name]) &&
            (Object.keys(this.selectedAgeFilters).length === 0 || this.selectedAgeFilters[record.Age.toString()])
        );
    }
}