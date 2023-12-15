public with sharing class recordPickerController {

    @AuraEnabled(cacheable = true)
    public static List<Contact> getContacts(Id accId){
        List<Contact> conList = new List<Contact>();

        if(accId != null){
            conList = [SELECT Id, FirstName, LastName, Phone, AccountId
                   FROM Contact 
                   WHERE AccountId =: accId];
        }
        return conList;
    }
    
}