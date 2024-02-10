import { LightningElement, api,track} from 'lwc';
import contactList from '@salesforce/apex/OnboardMerchant.getrelatedContacts';
import getAccountId from '@salesforce/apex/OnboardMerchant.getAccountId';
import Salutation from '@salesforce/schema/Contact.Salutation';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ContactsRecordForm extends LightningElement {
    @api opptyId;
    @track contacts;
    @track accId; 

    ListView = true;
    @track columns=[{label:'ID',fieldName:'Id'},{label:'Salutation',fieldName:'Salutation'},{label:'First Name',fieldName:'FirstName'},{label:'Last Name',fieldName:'LastName'},{label:'Email',fieldName:'Email'}];
    fields=[Salutation,FirstName,LastName,Email];
   
    connectedCallback(){

        //Getiing contact records Details
        const input = this.opptyId;
        contactList({oppId : input})
            .then(result=>{
                this.contacts = result;
                console.log('Result received');
            })
            .catch(error=>{
                console.log('No data Fetched'+error)
            })

            getAccountId({oppId : input})
            .then(result=>{
                this.accId =result;
                console.log('result: '+this.accId)
            })
            .catch(error=>{
                console.log('Error block fired for accoundId' +error);
            });
    }
    renderedCallback(){
       
       
    }

    handleNewContact(){
        this.ListView = false;
    }
    handleSubmit(event){
        //Record update
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.AccountId = this.accId; // modify a field
        console.log('Fields ' +fields);
        try{
            this.template.querySelector('lightning-record-form').submit(fields);
        }catch(e){
            console.log('Error '+e);
        }
       this.ListView = true;

        //Show success message on record Creation 
       const evt = new ShowToastEvent({
        title :'Contact created',
        message : 'Record Id: '+event.detail.id,
        variant :'success'
       });
       this.dispatchEvent(evt);

       //update DataTabel with latest Contact
    const input = this.opptyId;
    contactList({oppId : input})
        .then(result=>{
            this.contacts = result;
            console.log('Result received');
        })
        .catch(error=>{
            console.log('No data Fetched'+error)
        })
    }

    //handle back to contact tab with dataTabel
    handleclick(){
        console.log('Back clicked');
        this.ListView = true;
    }


    
}