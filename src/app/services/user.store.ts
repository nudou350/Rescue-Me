import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, finalize, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { convertSnapshots } from 'src/app/utils/db.utils';
import { User } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService {
  private userSubject$: BehaviorSubject<Partial<User>> = new BehaviorSubject({})
  user$: Observable<Partial<User>> = this.userSubject$.asObservable()
  private loginSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  isLoggedIn$: Observable<boolean> = this.loginSubject$.asObservable()

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth, private router: Router,
    private alertController: AlertController) {
    from(this.auth.onAuthStateChanged(
      next => {
        if (!!next) {
          this.getUserByUid(next.uid)
        }
      },
      err => console.log(err)
    )).subscribe()
  }

  getUserByUid(uid) {
    return from(this.afs.collection('users', ref => ref.where('uid', '==', uid)).get()).pipe(
      catchError(err => {
        console.log(err)
        return of(err)
      }),
      map(result => {
        const parsedResult = convertSnapshots<Partial<User>>(result)
        this.userSubject$.next(parsedResult[0])
        this.loginSubject$.next(true)
     
      })).subscribe()
}

  login(email, password) {
    from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      take(1),
      shareReplay(),
      switchMap(val => from(this.afs.collection('users', ref => ref.where('uid', '==', val.user.uid)).get()).pipe(
        catchError(err => {
          console.log(err)
          return of(err)
        }),
        map(result => {
          const parsedResult = convertSnapshots<Partial<User>>(result)
          console.log(parsedResult)
          this.userSubject$.next(parsedResult[0])
          console.log(this.userSubject$.getValue())
          this.loginSubject$.next(true)
          return this.router.navigateByUrl('tabs')

        })
      ))
    ).subscribe(
      next => { },
      err => this.loginFailed()
    )

  }

  logout() {
    this.loginSubject$.next(false)
    this.userSubject$.next({})
    window.location.reload()
    return from(this.auth.signOut()).pipe(take(1)).subscribe()
  }

  register(email, password) {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      take(1),
      switchMap(val => from(this.afs.collection('users').add({ uid: val.user.uid })).pipe(
        map(value => console.log(value))
      )),
      finalize(() => {
        this.router.navigateByUrl('/')
      })
    ).subscribe()
  }
  registerOng(email, password, ong, location) {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      take(1),
      switchMap(val => from(this.afs.collection(`ongs/`).add(
        {
          uid: val.user.uid,
          ong: ong,
          email: email,
          location: location
        })).pipe(
          map(value => console.log(value))
        )),
      finalize(() => {
        this.router.navigateByUrl('/')
      })
    ).subscribe()
  }

  async loginFailed() {
    const alert = await this.alertController.create({
      header: 'Email ou password inválidos',
      mode: 'ios',
      buttons: ["Confirmar"],
    });

    await alert.present();
  }

  isOng(): Observable<boolean> {
    return this.user$.pipe(
      map(val => {
        if (val?.isOng) {
          return true
        }
        return false
      })
    )
  }

  getOngLocation() {
    return this.userSubject$.getValue()?.location
  }
  getOngName() {
    return this.userSubject$.getValue()?.ong
  }
  getOngByPet(ong) {
    return from(this.afs.collection('users', ref => ref.where("ong", "==", ong)).get()).pipe(
      map(val => convertSnapshots(val))
    )
  }

}
