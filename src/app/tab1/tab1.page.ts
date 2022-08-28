import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PetStore } from '../services/pet.store';
import { UsersStoreService } from '../services/user.store';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pets$ = this.petStore.pets$
  user$ = this.userStore.isLoggedIn$
  filterActive = false
  location :string | null = null
  

  constructor(private petStore : PetStore, public router : Router, private userStore: UsersStoreService) {}

  filterLocation(location){
    if(location=="Todos") return this.pets$ = this.petStore.pets$
    this.filterActive = true
    this.location = location
    this.pets$=this.petStore.filterPets(this.location)
  }

  ngOnInit(): void {
    if(this.filterActive) {
      
    }
  }

  signOut(){
    this.userStore.logout()
    
  }

  viewDetails(pet){
    this.router.navigate(["tabs/pet-detail", pet.id, pet.ong])
  }

  updateList($event){
    $event.preventDefault()
    $event.stopImmediatePropagation()
    this.petStore.refreshPets()
    setTimeout(() => {
      $event.target.complete();
    }, 1000);
  }
}
