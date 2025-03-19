import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { State, selectContactList } from 'src/app/state';
import { ContactEditDialogComponent } from '../contact-edit-dialog/contact-edit-dialog.component';

@Component({
  selector: 'app-contact-add-dialog',
  templateUrl: './contact-add-dialog.component.html',
  styleUrls: ['../contact-edit-dialog/contact-edit-dialog.component.css'] //
})


export class ContactAddDialogComponent extends ContactEditDialogComponent {
  
  contactList$: Observable<Contact[]>;

  constructor(
    dialogRef: MatDialogRef<{contact: Contact}>,
    @Inject(MAT_DIALOG_DATA) data: {
      contact : Contact | null
    },
    private store : Store<State>,
  ){
    super(dialogRef, data)
    this.contactList$ = this.store.select(selectContactList)
  }

  override onSaveClick() : void {
    let newContact = this.contactForm.value
    
    this.contactList$.subscribe(array=>{ 
      newContact['id'] = array.length + 1;
    })

    this.dialogRef.close({
      id : newContact?.id || -1,
      ...newContact
    })
  }


}
