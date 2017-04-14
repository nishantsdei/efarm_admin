import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListInputComponent } from './list-input.component';
import { AddInputComponent } from './add-input.component';
import { InputManagementRoutingModule } from './input-management-routing.module';

@NgModule({
  imports: [
  	InputManagementRoutingModule,
  	 CommonModule    
  ],
  declarations: [
  	ListInputComponent,
  	AddInputComponent
  ]
})
export class InputManagementModule { }