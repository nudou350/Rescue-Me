import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../pages/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../pages/register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'create-pet',
        loadChildren: () => import('../pages/create-pet/create-pet.module').then( m => m.CreatePetPageModule)
      },
      {
        path: 'update-pet',
        loadChildren: () => import('../pages/update-pet/update-pet.module').then( m => m.UpdatePetPageModule)
      },
      {
        path: 'pet-detail/:id/:ong',
        loadChildren: () => import('../pages/pet-detail/pet-detail.module').then( m => m.PetDetailPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
