import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import {
  IconCompass, IconChevronLeft, IconPlusCircle, IconZoomIn, IconSearch, IconX,
  IconSettings, IconTag, IconStar, IconSave, IconList, IconHeart, IconFilter,
  IconEdit, IconDelete, IconBookmark, IconXCircle, IconArrowLeft,
  IconChevronsUp, IconCircle
} from 'angular-feather';

import { AppComponent } from './app.component';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { ExploreComponent } from './components/explore/explore.component';
import { EntryDetailComponent } from './components/entry-detail/entry-detail.component';
import { EditEntryComponent } from './components/edit-entry/edit-entry.component';
import { TagsComponent } from './components/tags/tags.component';
import { TagDetailComponent } from './components/tag-detail/tag-detail.component';

import { DataService } from './services/data.service';
import { UtilitiesService } from './services/utilities.service';
import { DictionaryService } from './services/dictionary.service';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEntryComponent,
    ExploreComponent,
    EntryDetailComponent,
    EditEntryComponent,
    TagsComponent,
    TagDetailComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    IconCompass,
    IconChevronLeft,
    IconPlusCircle,
    IconZoomIn,
    IconSearch,
    IconX,
    IconSettings,
    IconTag,
    IconStar,
    IconSave,
    IconList,
    IconHeart,
    IconFilter,
    IconEdit,
    IconDelete,
    IconBookmark,
    IconXCircle,
    IconArrowLeft,
    IconChevronsUp,
    IconCircle
  ],
  providers: [
    DataService,
    UtilitiesService,
    DictionaryService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
