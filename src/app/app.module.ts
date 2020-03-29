import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//components
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
//services
import { ContactService } from './services/contact.service';
import { NotificationService } from './services/notification.service';
//modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactsComponent,
    ContactFormComponent,
    ContactItemComponent
  ],
  providers: [
    ContactService,
    NotificationService
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
