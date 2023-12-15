public class getAccounts {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts() {
        List<Account> accList =  [SELECT Id, Name, Industry, Phone, Type FROM Account];
        return accList;
    }
}