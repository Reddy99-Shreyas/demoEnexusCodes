public with sharing class WrapperDemo {
    
    @AuraEnabled(cacheable=true)
    public static List<AccountContactWrapperClass> fetchAccountContactDetails(){
        List<AccountContactWrapperClass> lstAccountContWrapper = new List<AccountContactWrapperClass>();
        for(Account acc: [SELECT id, name, type, BillingCity, BillingCountry, BillingStreet, (SELECT Id FROM Contacts) 
            FROM Account WHERE Name != null LIMIT 10]){
            lstAccountContWrapper.add(new AccountContactWrapperClass(acc,acc.Contacts.size()));
        }
        return lstAccountContWrapper;
    }



    public class AccountContactWrapperClass{
        @AuraEnabled
        public Account acc;
        @AuraEnabled
        public Integer totalContacts;
        @AuraEnabled
        public String billingAdress;
        @AuraEnabled
        public String type;
        @AuraEnabled
        public String AccountName;
        @AuraEnabled
        public String AccountLink;

        public AccountContactWrapperClass(Account acc, Integer totalContacts){
            this.acc = acc;
            this.totalContacts = totalContacts;
            this.AccountLink = '/' + acc.Id;
            this.type = acc.type;
            this.AccountName = acc.Name;
            this.billingAdress = acc.BillingStreet + ',' + acc.BillingCity + ',' + acc.BillingCountry;
        }
    }
}