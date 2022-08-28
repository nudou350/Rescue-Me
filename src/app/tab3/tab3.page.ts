import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersStoreService } from '../services/user.store';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user$ = this.userStore.user$
  constructor(private userStore : UsersStoreService, private router: Router) {}

  create(){
    this.router.navigateByUrl('tabs/create-pet')
  }
  update(){
    this.router.navigateByUrl('tabs/update-pet')
  }

}
