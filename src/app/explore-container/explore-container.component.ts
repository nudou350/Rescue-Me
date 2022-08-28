import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PetStore } from '../services/pet.store';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  ngOnInit(){
    
  }

}
