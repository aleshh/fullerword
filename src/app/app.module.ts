import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { IconCompass } from 'angular-feather';

import { AppComponent } from './app.component';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { ExploreComponent } from './components/explore/explore.component';
import { DataService } from './services/data.service';
import { DictionaryService } from './services/dictionary.service';
import { EntryDetailComponent } from './components/entry-detail/entry-detail.component';
import { EditEntryComponent } from './components/edit-entry/edit-entry.component';
import { TagsComponent } from './components/tags/tags.component';
import { TagDetailComponent } from './components/tag-detail/tag-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEntryComponent,
    ExploreComponent,
    EntryDetailComponent,
    EditEntryComponent,
    TagsComponent,
    TagDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    IconCompass
  ],
  providers: [
    DataService,
    DictionaryService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
