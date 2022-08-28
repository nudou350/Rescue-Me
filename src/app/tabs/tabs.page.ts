import { Component } from '@angular/core';
import { UsersStoreService } from '../services/user.store';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isOng$ = this.userStore.isOng()
  constructor(private userStore : UsersStoreService) {}

}
