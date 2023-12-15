public with sharing class Treedemo {
    @AuraEnabled(cacheable = true)
	public static List<Account> getAccountDetails(){
		return [SELECT Id, Name, (SELECT FirstName, LastName FROM Contacts) FROM Account LIMIT 10];
	}
}