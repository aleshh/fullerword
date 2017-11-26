import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { ExploreComponent } from './components/explore/explore.component';
import { EntryDetailComponent } from './components/entry-detail/entry-detail.component';
import { EditEntryComponent } from './components/edit-entry/edit-entry.component';
import { TagsComponent } from './components/tags/tags.component';
import { TagDetailComponent } from './components/tag-detail/tag-detail.component';
import { SettingsComponent } from './components/settings/settings.component';

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
    path: 'tags',
    component: TagsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'detail/:text',
    component: EntryDetailComponent
  },
  {
    path: 'add/:text',
    component: EditEntryComponent
  },
  {
    path: 'edit/:text',
    component: EditEntryComponent
  },
  {
    path: 'tag/:tag',
    component: TagDetailComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}