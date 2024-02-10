import { LightningElement,track ,api} from 'lwc';
import getrelatedQuote from '@salesforce/apex/OnboardMerchant.getrelatedQuote';
import getAccountId from '@salesforce/apex/OnboardMerchant.getAccountId';
import type from '@salesforce/schema/SBQQ__Quote__c.SBQQ__Type__c';
import Status from '@salesforce/schema/SBQQ__Quote__c.SBQQ__Status__c';
import PaymentTerms from '@salesforce/schema/SBQQ__Quote__c.SBQQ__PaymentTerms__c';
import DeliveryMethod from '@salesforce/schema/SBQQ__Quote__c.SBQQ__DeliveryMethod__c';
import Primary from '@salesforce/schema/SBQQ__Quote__c.SBQQ__Primary__c';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class QuoteRecordForm extends LightningElement {
    @api opptyId;
    @track quotes;
    table = true;
    @track accId;

    fields=[type,Status,PaymentTerms,DeliveryMethod,Primary];
    @track columns=[{label:'type',fieldName:'SBQQ__Type__c'},
                    {label:'Status',fieldName:'SBQQ__Status__c'},
                    {label:'PaymentTerms',fieldName:'SBQQ__PaymentTerms__c'},
                    {label:'DeliveryMethod',fieldName:'SBQQ__DeliveryMethod__c'},
                    {label:'Primary',fieldName:'SBQQ__Primary__c'}
                    ];

    connectedCallback(){
        const input = this.opptyId;
        getrelatedQuote({oppId : input}).then(result=>{this.quotes = result;console.log('Quotes updated');}).catch(error=>{console.log('Quote Error' +error)});
        
        getAccountId({oppId : input})
            .then(result=>{
                this.accId =result;
                console.log('quote acc result: '+this.accId)
            })
            .catch(error=>{
                console.log('Error block fired for accoundId' +error);
            });

    }

    handleNewQuote(){
        this.table =false;
        console.log('button clicked new Quote');
    }

    handleback(){
        this.table =true;
        }

        handleSubmit(event){
            event.preventDefault();
            const fields = event.detail.fields;
            fields.SBQQ__Account__c = this.accId;
            console.log('Quote accId ' +this.accId);
            this.template.querySelector('lightning-record-form').submit(fields);
            this.table =true;


            const showToast = new ShowToastEvent({
                title :'Quote created',
                message :'Record Id'+event.detail.id,
                variant :'success',
            });
            this.dispatchEvent(showToast);
        }
}