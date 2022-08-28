import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"
import { IonicModule } from '@ionic/angular';

import { CreatePetPageRoutingModule } from './create-pet-routing.module';

import { CreatePetPage } from './create-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreatePetPageRoutingModule
  ],
  declarations: [CreatePetPage]
})
export class CreatePetPageModule {}
