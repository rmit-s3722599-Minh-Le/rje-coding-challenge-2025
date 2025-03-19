import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { State, selectContactList } from 'src/app/state';

@Component({
  selector: 'app-contact-add-dialog',
  templateUrl: './contact-add-dialog.component.html',
  styleUrls: ['./contact-add-dialog.component.css']
})



export class ContactAddDialogComponent {
  
  contactList$: Observable<Contact[]>;

  constructor(
    public dialogRef: MatDialogRef<{contact: Contact}>,
    @Inject(MAT_DIALOG_DATA) public data: {
      contact : Contact | null
    },
    private store : Store<State>,
    private changeDetection: ChangeDetectorRef
  ){
    this.contactList$ = this.store.select(selectContactList)
  }

  contactForm: FormGroup = new FormGroup({
    firstName : new FormControl(),
    lastName : new FormControl(),
    phoneNumber : new FormControl(),
    email : new FormControl()
  })

  ngOnInit(){
  }

  onSaveClick() : void {
    let newContact = this.contactForm.value
    
    this.contactList$.subscribe(array=>{ 
      newContact['id'] = array.length + 1;
    })

    this.dialogRef.close({
      id : newContact?.id || -1,
      ...newContact
    })
  }

  onCancelClick() : void {
    this.dialogRef.close();
  }

}
