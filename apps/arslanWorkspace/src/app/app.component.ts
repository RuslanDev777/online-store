import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainNavComponent } from './main-nav/main-nav.component';
import {
  CategoryService,
  getCategoriesActions,
  selectCategories,
} from '@arslan-workspace/category';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  imports: [RouterModule, MainNavComponent, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'arslanWorkspace';
  private readonly store = inject(Store);

  ngOnInit(): void {
    console.log('Dispatching action');
    this.store.dispatch(getCategoriesActions());
  }
}
