import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactEditDialogComponent } from './dialogs/contact-edit-dialog/contact-edit-dialog.component';
import { ContactAddDialogComponent } from './dialogs/contact-add-dialog/contact-add-dialog.component';
import { PickRoleDialogComponent } from './dialogs/pick-role-dialog/pick-role-dialog.component';
import { StoreModule } from '@ngrx/store';

import { reducer } from './state/reducer';
import { ContactEffects } from './state/effects';
import { EffectsModule } from '@ngrx/effects';

import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactEditDialogComponent,
    PickRoleDialogComponent,
    ContactAddDialogComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({contacts : reducer}),
    EffectsModule.forRoot(ContactEffects),
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
