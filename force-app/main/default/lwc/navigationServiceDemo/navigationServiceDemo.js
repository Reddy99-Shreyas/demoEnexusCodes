import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class NavigationServiceDemo extends NavigationMixin(LightningElement) {

    handleFirstbuttonClick(){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes:{
                apiName: 'Testing_Components_Tab'
            }
        })
    }

    handleSecondbuttonClick(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName: 'Account',
                actionName: 'list'
            },
            state:{
                filterName: 'Recent'
            }

        })
    }

    handleThirdbuttonClick(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName: 'Account',
                actionName: 'new'
            }
        })
    }
}