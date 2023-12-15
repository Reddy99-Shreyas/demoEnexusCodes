public with sharing class serverSortingController {
    @AuraEnabled(cacheable = true)
    public static List<opportunity> fetchSortedData(String sortedBy, String sortedDirection){
        String query = 'SELECT Id, Name, Amount FROM Opportunity WHERE Amount != null';

        if(sortedBy != null && sortedDirection != null){
            query += ' order by ' + sortedBy + ' ' + sortedDirection;
        }
        return Database.query(query);
    }
}