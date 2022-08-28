import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersStoreService } from 'src/app/services/user.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = this.fb.group({
    email: [null, Validators.required],
    password : [null, Validators.required]
  })
  constructor(private fb : FormBuilder, private userStore : UsersStoreService, public router : Router) { }

  get email(){
    return this.form.controls['email']
  }
  get password(){
    return this.form.controls['password']
  }
  ngOnInit() {
  }

  login(){
    this.userStore.login(this.email.value, this.password.value)
  }

}
