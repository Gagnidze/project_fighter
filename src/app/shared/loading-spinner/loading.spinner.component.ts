import { Component } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    // no need for external template here, this ugly stolen code will work here
    template: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
    styleUrls: ['./loading.spinner.component.scss']
})

export class LoadingSpinnerComponent { }