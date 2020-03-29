import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
//services
import { ContactService } from '../../services/contact.service';
import { NotificationService } from '../../services/notification.service';
//models
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent implements OnInit {
	//load and submit
	public submitted:boolean=false;
	public loading:boolean=false;
	//contact
	public contact:any;
	//form
	public form: FormGroup;
  	public formData = new FormData();
  	//file
  	public backgroundImage:any="https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg";
  	public fileData: File = null;
  	public fileDataValidator = {
	    format: false
	};
  	constructor(
  		public contactService: ContactService,
  		public notificationService: NotificationService,
  		public formBuilder: FormBuilder,
  		public router:Router,
    	public route: ActivatedRoute,) { }
	ngOnInit() {
    	this.form = this.getFormBuilder();
    	this.contact = this.getContactValues();
    	if(this.route.snapshot.paramMap.get("id")){
			this.getContact(parseInt(this.route.snapshot.paramMap.get("id")));
		}
	}
	get f() {
	    return this.form.controls;
	}
	getContact(id:number){
		this.loading=true;
		this.contactService.get(id).toPromise().then((response: any) => {
			this.loading=false;
			this.contact = response.data;
			this.backgroundImage=this.contact.photo;
		}).catch( 
		  	error => {
			    this.loading=false;
			    console.log("error:",error);
			    this.notificationService.showError('Error',error.error)
		  	}
		);
	}
	getContactValues(){
		return {
			name:'',
			last_name:'',
			photo:'',
			phone:'',
			address:'',
			email:''
		}
	}
	getFormBuilder() {
    	return this.formBuilder.group({      	
	      	name: ["",
		        [
		          Validators.required,
		          Validators.maxLength(30),
		          Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$")
		        ]
	      	],
	      	last_name: ["",
		        [
		          Validators.maxLength(30),
		          Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$")
		        ]
	      	],
	      	email: ["",[
		      		Validators.required,
		         	Validators.pattern(
		            	new RegExp(
		              		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		            	)
		          	)
		        ]
	      	],
	      	phone: ["",
		        [
		          Validators.required,
		          Validators.maxLength(18),
		          Validators.minLength(10),
		          // Validators.pattern("^[0-9 ]+$")
		        ]
	      	],
	      	address: ["", [Validators.maxLength(140)]]
    	});
  	}
  	getFormData() {
    	this.formData.append("name", this.form.value.name);    	
    	this.formData.append("last_name", this.form.value.last_name);
    	this.formData.append("email", this.form.value.email);
    	this.formData.append("address", this.form.value.address);
	    if (this.fileData) {
	      this.formData.append("photo", this.fileData);
	    }
    	let split  = this.form.value.phone.split("");
    	let format = "";
        for (var i = 0; i < split.length; ++i) {
          if(!(split[i] == " ") && !(split[i] == "+")) {
            format+= split[i];
          }
        }
    	this.formData.append("phone", format);
    	return this.formData;
  	}
  	fileProgress(fileInput: any) {
	    this.fileData = <File>fileInput.target.files[0];
	    this.preview();
	}
  	preview() {
	    // Show preview
	    if (this.fileData.type.match(/image\/*/) == null) {
	      this.fileDataValidator.format = true;
	      return;
	    }
	    this.fileDataValidator.format = false;
	    var reader = new FileReader();
	    reader.readAsDataURL(this.fileData);
	    reader.onload = _event => {
	    	this.backgroundImage= reader.result;
	      	// this.contact.photo = reader.result;
	    };
  	}
  	phoneFormat(e: KeyboardEvent){  //evita el ingreso de caracteres no numericos
      	if(this.contact.phone.length > 18) {
	        while(this.contact.phone.length > 18){
	          this.contact.phone = this.contact.phone.slice(0,-1);
	        }
          return;
      	}
	    if(e.key == "Backspace" || e.key == "ArrowLeft" || e.key == "ArrowRight"){
	        return;
	    }
	    if(e.key!=undefined){
	    	if(e.key.search(/[0-9]/) == -1) {
		      	this.contact.phone = this.contact.phone.slice(0,-1);
		      	return;
		    }
	    }	    
      	let phone = (e.target as HTMLInputElement).value;    
      	this.phoneFormatView(phone);
  	}
  	phoneFormatView(num:any){  //formatea la vista del número
    	//+54 9 11 0000 0000
    	let split:any = num.split("");
    	let format = "";
    	for (var i = 0; i < split.length; ++i) {
    	  if(!(split[i] == " ") && !(split[i] == "+")) {
    	    format+= split[i];
    	  }
    	}
    	split  = format.split("");
    	format = "+";

	    for (var j = 0; j < split.length; ++j) {
	      if(j == 1 || j == 2 || j == 4 || j == 8) {
	        format = format + split[j] + " ";
	      }else{
	        format = format + split[j];
	      }
	    }
      	this.contact.phone = format;
  	}
  	save(){
    	this.submitted = true;
  		if (this.form.invalid || this.fileDataValidator.format) {
	      return;
	    }
	    if(this.contact.id){
		    this.loading=true;
			this.contactService.update(this.contact.id,this.getFormData()).toPromise().then((response: any) => {
				this.loading=false;
				this.notificationService.showSuccess('Operación realizada',response.message)
				this.router.navigate(['/']);
		   	}).catch( 
		      error => {
		        this.loading=false;
		        console.log("error:",error);
		        this.notificationService.showError('Error',error.error)
		      }
		    );
	    } 
	    else{
		    this.loading=true;
		    this.contactService.create(this.getFormData()).toPromise().then(
		    response => {
		      	this.loading=false;
				this.notificationService.showSuccess('Operación realizada',response.message)
				this.router.navigate(['/']);
		    }).catch( 
		      error => {
		        this.loading=false;
		        console.log("error:",error);
		        this.notificationService.showError('Error',error.error)
		      }
		    );
		}
  	}
}
