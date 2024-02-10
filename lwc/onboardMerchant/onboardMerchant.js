import {api, LightningElement ,track} from 'lwc';
import {CloseActionScreenEvent} from 'lightning/actions';

export default class OnboardMerchant extends LightningElement {
    
    @api recordId;
    @track accId;
    @track contacts;
    isLoaded;
    modalContainer;
   
    connectedCallback(){
        
    }
    renderedCallback(){
        if(this.isLoaded) return;
        const STYLE = document.createElement("style");
        STYLE.innerHTML = `.uiModal--medium .modal-container{
            width: 100% !important;
            max-width : 100%;
            min-width : 500px;
            max-height : 100%;
            min-height : 500px;
        }`
        this.template.querySelector('lightning-card').appendChild(STYLE);
        this.isLoaded=true;

    }

    
    handleBackAction(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }
   
    
   
}