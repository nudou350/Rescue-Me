import { Component, OnDestroy, OnInit } from '@angular/core';
import { PetStore } from 'src/app/services/pet.store';
import { UsersStoreService } from 'src/app/services/user.store';

@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.page.html',
  styleUrls: ['./update-pet.page.scss'],
})
export class UpdatePetPage implements OnInit, OnDestroy {

  ong 
  pets$
  constructor(private petStore: PetStore, private userStore: UsersStoreService) { }

  ngOnInit() { 
    this.ong= this.userStore.getOngName()
    this.pets$ =  this.petStore.getPetsByOng(this.ong)
  }


  removePet(pet) {
    console.log(pet)
    this.petStore.removePet(pet)
  }

  ngOnDestroy(): void {
    this.ong = null
    this.pets$ = null
  }
}
