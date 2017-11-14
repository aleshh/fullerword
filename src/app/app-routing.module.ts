import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { ExploreComponent } from './components/explore/explore.component';
import { EntryDetailComponent } from './components/entry-detail/entry-detail.component';
import { EditEntryComponent } from './components/edit-entry/edit-entry.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/add-entry',
    pathMatch: 'full'
  },
  {
    path: 'add-entry',
    component: AddEntryComponent
  },
  {
    path: 'explore',
    component: ExploreComponent
  },
  {
    path: 'detail/:text',
    component: EntryDetailComponent
  },
  {
    path: 'edit/:text',
    component: EditEntryComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}