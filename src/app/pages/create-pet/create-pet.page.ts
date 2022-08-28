import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { last, concatMap, tap, catchError, finalize } from 'rxjs/operators';
import { PetStore } from 'src/app/services/pet.store';
import { UsersStoreService } from 'src/app/services/user.store';


@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.page.html',
  styleUrls: ['./create-pet.page.scss'],
})
export class CreatePetPage implements OnInit {

  percentageChanges$
  fileName = ''


  form = this.fb.group({
    name: [null, Validators.required],
    location: ['', Validators.required],
    description: [null, Validators.required],
    imgUrl: [null, Validators.required],
    ong: ['', Validators.required],
    gender: [null, Validators.required],
    size: [null, Validators.required],
    age: [null, Validators.required]
  })

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private storage: AngularFireStorage,
    public router: Router,
    private petStore: PetStore,
    public userStore: UsersStoreService) { }

  ngOnInit() {
    this.ong.setValue(this.userStore.getOngName())
    this.location.setValue(this.userStore.getOngLocation())
   }
  get name() {
    return this.form.controls['name']
  }
  get location() {
    return this.form.controls['location']
  }
  get description() {
    return this.form.controls['description']
  }
  get imgUrl() {
    return this.form.controls['imgUrl']
  }
  get ong() {
    return this.form.controls['ong']
  }
  get size() {
    return this.form.controls['size']
  }
  get gender() {
    return this.form.controls['gender']
  }
  get age() {
    return this.form.controls['age']
  }
  onClick(fileUpload: HTMLInputElement) {
    fileUpload.click()
  }

  onFileSelected(event: any) {
    console.log(this.location.value)
    const file: File = event.target.files[0]
    const filePath = `pets/${this.location.value}/${file.name}`
    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });
    this.percentageChanges$ = task.percentageChanges()
    task.snapshotChanges().pipe(
      last(),
      concatMap(() => this.storage.ref(filePath).getDownloadURL()),
      tap(url => this.imgUrl.setValue(url)),
      catchError(err => {
        console.log(err)
        alert("Smth ocurred")
        return throwError(err)
      }),
      finalize(() => this.percentageChanges$ = null)

    ).subscribe()
  }

  savePet() {
    this.petStore.addPet(
      this.name.value, 
      this.location.value, 
      this.description.value, 
      this.imgUrl.value,
      this.ong.value, 
      this.gender.value, 
      this.size.value,
      this.age.value)

      this.router.navigateByUrl('tabs/tab3')
      this.form.reset()
  }

}
