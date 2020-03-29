import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { Contact } from '../models/contact'
import { environment } from '../../environments/environment';

@Injectable()
export class ContactService {
    public base_url = environment.base_url+'/contacts/';
    constructor(public http: HttpClient) {
    }
    getHttpHeaders(){
        return new HttpHeaders({
            "Content-Type": "application/json",   
            "accept": "application/json",
        });
    }
    all(): Observable <any> {
        return this.http.get(this.base_url+'all',
          {headers:this.getHttpHeaders()}
        );
    }
    create(contact_data: Contact): Observable<any> {
        return this.http.post(this.base_url+'store',
          contact_data,
          {headers:this.getHttpHeaders()}
        );
    }
    delete(id:number): Observable <any> {
        return this.http.delete(this.base_url+'delete/'+id,
          {headers:this.getHttpHeaders()}
        );
    }
    get(id:number): Observable <any> {
        return this.http.get(this.base_url+'get/'+id,
          {headers:this.getHttpHeaders()}
        );
    }
    update(id:number, contact_data: Contact): Observable <any> {
        return this.http.post(this.base_url+'update/'+id,
          contact_data,
          {headers:this.getHttpHeaders()}
        );
    }
}