import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/models/IPet';
import { PetStore } from 'src/app/services/pet.store';
import { UsersStoreService } from 'src/app/services/user.store';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.page.html',
  styleUrls: ['./pet-detail.page.scss'],
})
export class PetDetailPage implements OnInit {

  params = {
    id : '',
    ong : ''
  }
  selectedPet$ : Observable<Pet[]>
  relatedOng$

  constructor(
    private route : ActivatedRoute, 
    private petStore : PetStore,
    public router: Router,
    private userStore : UsersStoreService) { 
    this.route.params.subscribe(val => {
      this.params.id=val.id
      this.params.ong = val.ong
    })
  }

  ngOnInit() {
    console.log(this.params)
    this.selectedPet$= this.petStore.getPetById(this.params.id)
    this.relatedOng$ = this.userStore.getOngByPet(this.params.ong)
    this.userStore.getOngByPet(this.params.ong).subscribe(console.log)
  }
}
