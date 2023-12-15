import { LightningElement,track, api } from 'lwc';

const options = [
    { label: 'Salesforce', value: 'Salesforce' },
    { label: 'Oracle', value: 'Oracle' },
    { label: 'SAP', value: 'SAP' },
];

export default class ChecxboxCmp extends LightningElement {
    @track showStack = false;
    techoptions = options;
    value;

    @api checkboxOptions = [];

    handleChange(e){
        this.value = e.detail.value;
        //const selectedValue = e.detail.value;
        this.showStack = !!this.value;
        console.log(this.value);

        if(this.value === 'Salesforce'){
            this.checkboxOptions = ["Sales Cloud", "Service Cloud", "Marketing Cloud", "Commerce Cloud", "App Cloud", "Einstein Analytics", "Community Cloud", "IOTCloud", "Force.com", "Apex", "LWC", "Aura", "Salesforce"];
            console.log(this.checkboxOptions);
            //filteredResults();
        }else if(this.value === 'Oracle'){
            this.checkboxOptions = ["Java", "SQL", "ERP", "DBA"];
            console.log(this.checkboxOptions);
            //filteredResults();
        }else if(this.value === 'SAP'){
            this.checkboxOptions = ["ABAP", "SAP", "Hana"];
            console.log(this.checkboxOptions);
            //filteredResults();
        }else {
            this.checkboxOptions = [];
        }
    }

    @track searchTerm = '';
    @track itemcounts = 'None Selected';

    @api selectedItems = [];
    @track allValues = []; // this will store end result or selected values from picklist
    @track valuesVal = [];

    handleSearch(event){
        this.searchTerm = event.target.value;
    }

    get filteredResults(){
        console.log(this.valuesVal);
        if(this.valuesVal == undefined){
            //try{    
                console.log(1)
            this.valuesVal = this.checkboxOptions;
            console.log(2)
            console.log("data"+JSON.stringify(this.checkboxOptions))

            Object.keys(this.valuesVal).map(profile => {
                this.allValues.push({ Id: profile, Name: this.valuesVal[profile] });
            })

            this.valuesVal = this.allValues.sort(function (a, b) { return a.Id - b.Id });
            this.allValues = [];

            console.log('da ', JSON.stringify(this.valuesVal));
            // }catch(e){
            //     console.log(e);
            // }
            
        }

        if (this.valuesVal != null && this.valuesVal.length != 0) {
            if (this.valuesVal) {
                const selectedProfileNames = this.selectedItems.map(profile => profile.Name);
                console.log('selectedProfileNames ', JSON.stringify(selectedProfileNames));
                return this.valuesVal.map(profile => {

                    //below logic is used to show check mark (✓) in dropdown checklist
                    const isChecked = selectedProfileNames.includes(profile.Id);
                    return {
                        ...profile,
                        isChecked
                    };

                }).filter(profile =>
                    profile.Id.toLowerCase().includes(this.searchTerm.toLowerCase())
                ).slice(0, 20);
            } else {
                return [];
            }
        }
    }

    handleSelection(event) {
        const selectedProfileId = event.target.value;
        const isChecked = event.target.checked;

        //below logic is used to show check mark (✓) in dropdown checklist
        if (isChecked) {
            const selectedProfile = this.valuesVal.find(profile => profile.Id === selectedProfileId);
            if (selectedProfile) {
                this.selectedItems = [...this.selectedItems, selectedProfile];
                this.allValues.push(selectedProfileId);
            }
        } else {
            this.selectedItems = this.selectedItems.filter(profile => profile.Id !== selectedProfileId);
            this.allValues.splice(this.allValues.indexOf(selectedProfileId), 1);
        }
        this.itemcounts = this.selectedItems.length > 0 ? `${this.selectedItems.length} options selected` : 'None Selected';
    }

    //Remove function for lightning pill
    handleRemove(event) {
        const valueRemoved = event.target.name;
        this.selectedItems = this.selectedItems.filter(profile => profile.Id !== valueRemoved);
        this.allValues.splice(this.allValues.indexOf(valueRemoved), 1);
        this.itemcounts = this.selectedItems.length > 0 ? `${this.selectedItems.length} options selected` : 'None Selected';
    }

    selectall(event) {
        event.preventDefault();
        // missing select all checkbox checked on click
        this.selectedItems = this.valuesVal;
        this.itemcounts = this.selectedItems.length + ' options selected';
        this.allValues = [];
    }

    handleclearall(event) {
        event.preventDefault();

        this.selectedItems = [];
        this.allValues = [];
        this.itemcounts = 'None Selected';
        this.searchTerm = '';
    }

}