public with sharing class OnboardMerchant {
    @AuraEnabled(cacheable =True)
    public static String getAccountId(String oppId){
        System.debug('AccountId Called' +oppId);
        Id accId = [SELECT Id,AccountId FROM opportunity where Id =:oppId ].AccountId;
        System.debug('AccountId' +accId);
        return accId;
    }
    
    @AuraEnabled(cacheable =True)
    public static List<Contact> getrelatedContacts(String oppId){
        System.debug('contacts Called' +oppId);
        Id accId = [SELECT Id,AccountId FROM Opportunity where Id =:oppId ].AccountId;
        List<Contact> conList = [SELECT Id,AccountId,FirstName,LastName,Salutation,Email FROM contact where AccountId =:accId ];
        System.debug(conList[0]);
        return conList;
    }

    @AuraEnabled(cacheable =True)
    public static List<SBQQ__Quote__c> getrelatedQuote(String oppId){
         //quoteList = new List<SBQQ__Quote__c>();
        
        System.debug('quote Called' +oppId);
        List<SBQQ__Quote__c> quoteList = [SELECT Id,SBQQ__Type__c,SBQQ__Status__c,SBQQ__PaymentTerms__c,SBQQ__DeliveryMethod__c,SBQQ__Opportunity2__c FROM SBQQ__Quote__c where SBQQ__Opportunity2__c	 =:oppId ];
       
        return quoteList;
    }
}