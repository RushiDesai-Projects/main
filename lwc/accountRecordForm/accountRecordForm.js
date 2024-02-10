import { LightningElement ,api,track} from 'lwc';
import getAccountId from '@salesforce/apex/OnboardMerchant.getAccountId';
import account_Name from '@salesforce/schema/Account.Name';
import account_Rating from '@salesforce/schema/Account.Rating';
import account_AnnualRevenue from '@salesforce/schema/Account.AnnualRevenue';

export default class AccountRecordForm extends LightningElement {
    @api opptyId;
    fields = [account_Name, account_Rating, account_AnnualRevenue ];
    @track accId;

    connectedCallback(){
        //Getting Account Id for lds;
        const input = this.opptyId;
        getAccountId({oppId : input})
            .then(result=>{
                this.accId =result;
                console.log('result: '+this.accId)
            })
            .catch(error=>{
                console.log('Error block fired for accoundId' +error);
            });
    }

    handleSubmit(event){
        event.preventDefault(); // stop the form from submitting
       const fields = event.detail.fields;
       //fields.LastName = 'My Custom Last Name'; // modify a field
      this.template.querySelector('lightning-record-form').submit(fields);
    }
}