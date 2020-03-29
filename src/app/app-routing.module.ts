import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
  },
  {
    path: 'contact-form',
    component: ContactFormComponent,
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
       useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
