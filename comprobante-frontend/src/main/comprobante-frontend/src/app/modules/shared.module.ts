import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveRowsDirective } from '../core/directives/responsive-rows.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ResponsiveRowsDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    HttpClientModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    HttpClientModule,

    ResponsiveRowsDirective,
  ]
})
export class SharedModule { }
