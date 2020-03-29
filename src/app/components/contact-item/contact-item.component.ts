import { Component, OnInit, Input, Output, EventEmitter,} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ContactService } from '../../services/contact.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],
})
export class ContactItemComponent implements OnInit {
  	@Input() contact: any;
    @Output() onDelete = new EventEmitter<string>();
  	public loading:boolean=false;
  	constructor(public contactService: ContactService,
  		public notificationService: NotificationService,      
      public sanitizer: DomSanitizer) {}
  	ngOnInit() {
  	}
  	delete(id:number){
  		this.loading=true;
	    this.contactService.delete(id).toPromise().then(
	    response => {
	      	this.loading=false;
          console.log("response:",response)
          this.onDelete.emit(response.data);
			    this.notificationService.showSuccess('Operación realizada',response.message)
	    }).catch( 
	      error => {
	        this.loading=false;
	        console.log("error:",error);
	        this.notificationService.showError('Error',error.error)
	      }
	    );
  	}
    photoURL(){
      let url:string=this.contact.photo?this.contact.photo:'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg';
      return this.sanitizer.bypassSecurityTrustUrl(url);
      // return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
