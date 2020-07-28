import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetStartedRoutingModule } from './get-started-routing.module';
import { GetStartedComponent } from './get-started.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [GetStartedComponent],
  imports: [
    CommonModule,
    GetStartedRoutingModule,
    SharedModule
  ]
})
export class GetStartedModule { }
