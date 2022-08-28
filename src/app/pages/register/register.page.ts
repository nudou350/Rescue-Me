import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersStoreService } from 'src/app/services/user.store';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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

  register(){
    this.userStore.register(this.email.value, this.password.value)
  }
}
