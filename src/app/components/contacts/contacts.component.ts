import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
	public contacts: any[]=[];
  public loading: boolean=false;
  public search: string=null;
  constructor(public contactService: ContactService) { }
  ngOnInit() {
    this.getAllContacts();  	
  }
  getAllContacts(){
    this.loading=true;
    this.contactService.all().toPromise().then(
    response => {
      this.loading=false;
      this.contacts=response.data;
    }).catch( 
      error => {
        this.loading=false;
        console.log("error:",error);
        // this.notification_service.showError('Error',error.error)
      }
    ); 
  }
  onDelete(event:any) { //RECARGA LOS BLOGS AL AGREGARCE UNO NUEVO
    console.log("event:",event)
    this.contacts=this.contacts.filter((element)=> element.id!=event);
  }
}
