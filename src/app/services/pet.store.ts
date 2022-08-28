import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { convertSnapshots } from 'src/app/utils/db.utils';
import {map, shareReplay, take, tap, finalize, switchMap} from "rxjs/operators"
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Pet } from '../models/IPet';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PetStore {

  private petSubject$ : BehaviorSubject<Partial<Pet[]>> = new BehaviorSubject([])
  pets$ = this.petSubject$.asObservable()

  constructor(private afs : AngularFirestore, private router : Router) { 
    this.getPets().subscribe()
  }

  getPets(){
    return this.afs.collection('pets').get().pipe(
      take(1),
      shareReplay(),
      map(val => {
        return this.petSubject$.next(convertSnapshots<Pet>(val))
      }),
    )
  }

  refreshPets(){
    return this.afs.collection('pets').get().pipe(
      take(1),
      map(val => {
        return this.petSubject$.next(convertSnapshots<Pet>(val))
      }),
    )
  }
  getPetsByOng(ong){
    return this.pets$.pipe(
      map(val => val.filter(pet => pet.ong == ong)),
      tap((val => console.log(val)))
    )
  }

  filterPets(location?:string){
    return this.pets$.pipe(
      map(val => val.filter(pet => pet.location == location)),
      tap((val => console.log(val)))
    )
  }

  addPet(name, location , description, url , ong, gender, size, age){
    const newPet : Pet = {
      name,
      location,
      description,
      url,
      ong,
      gender,
      size,
      age
    }
  return from(this.afs.collection('pets').add(newPet)).subscribe(
    next => {
      const oldValues = this.petSubject$.getValue()
      oldValues.push(newPet)
      console.log(oldValues)
      this.petSubject$.next(oldValues)
    })
  }

  updatePet(pet){

  }
  
  removePet(pet){
    return from(this.afs.doc(`pets/${pet.id}`).delete()).pipe(
      take(1),
      finalize(()=> {
        const oldList = this.petSubject$.getValue()
        let newList = oldList.filter(item => item.id != pet.id)
        this.petSubject$.next(newList)
        return this.router.navigateByUrl('')
      })
      ).subscribe()
  }

  getPetById(id) : Observable<Pet[]>{
    return this.pets$.pipe(
      map(val => val.filter(pet => pet.id == id))
    )
  }

  
}

