import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCategoryComponent } from './list-category.component';
import { AddCategoryComponent } from './add-category.component';
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  imports: [
  	CategoryRoutingModule,
  	CommonModule    
  ],
  declarations: [
  	ListCategoryComponent,
  	AddCategoryComponent
  ]
})
export class CategoryModule { }