import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  preferences;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.preferences = this.dataService.getPreferences();
  }

  changeSort(event): void {
    this.dataService.setPreference('sortWordListBy', event);
    this.preferences.sortWordListBy = event;
  }

  changeDisplaySize(size): void {
    this.dataService.setPreference('exploreDisplaySize', size);
    this.preferences.exploreDisplaySize = size;
  }

  toggleSampleData():void {
    if (this.preferences.sampleDataLoaded) {
    this.dataService.removeSampleData();
    this.preferences.sampleDataLoaded = false;
    } else {
    this.dataService.loadSampleData();
    this.preferences.sampleDataLoaded = true;
    }
  }

  toggleSetting(setting: string): void {
    this.preferences[setting] = !this.preferences[setting];
    this.dataService.setPreference(setting, this.preferences[setting]);
  }

  toggleTagEntrySeparator(): void {
    if (this.preferences.tagEntrySeparator == ',') {
      this.preferences.tagEntrySeparator = ' ';
    } else {
      this.preferences.tagEntrySeparator = ',';
    }
    this.dataService.setPreference('tagEntrySeparator', this.preferences.tagEntrySeparator);
  }

  // changeStarSetting(): void {
  //   this.preferences.useStarRating = !this.preferences.useStarRating;
  //   this.dataService.setPreference('useStarRating', this.preferences.useStarRating);
  // }

}
