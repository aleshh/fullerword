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

  toggleSampleData():void {
    if (this.preferences.sampleDataLoaded) {
    this.dataService.removeSampleData();
    this.preferences.sampleDataLoaded = false;
    } else {
    this.dataService.loadSampleData();
    this.preferences.sampleDataLoaded = true;
    }
  }

  changeSort(event): void {
    this.dataService.setPreference('sortWordListBy', event);
    this.preferences.sortWordListBy = event;
  }

  changeDisplaySize(size): void {
    this.dataService.setPreference('exploreDisplaySize', size);
    this.preferences.exploreDisplaySize = size;
  }

  changeStarSetting(): void {
    this.preferences.useStarRating = !this.preferences.useStarRating;
    this.dataService.setPreference('useStarRating', this.preferences.useStarRating);
  }

}
