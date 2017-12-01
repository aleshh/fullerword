import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  // sampleDataLoaded: boolean;
  // sortWordListBy: string;
  // exploreDisplaySize: string;
  // useStarRating: boolean;
  preferences;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.sampleDataLoaded = this.dataService.getPreference('sampleDataLoaded');
    // this.sortWordListBy = this.dataService.getPreference('sortWordListBy');
    // this.exploreDisplaySize = this.dataService.getPreference('exploreDisplaySize');
    // this.useStarRating = this.dataService.getPreference('useStarRating');
    this.preferences = this.dataService.getPreferences();
  }

  loadSampleData(): void {
    this.dataService.loadSampleData();
    this.preferences.sampleDataLoaded = true;
  }

  removeSampleData(): void {
    this.dataService.removeSampleData();
    this.preferences.sampleDataLoaded = false;
  }

  changeSort(event): void {
    this.dataService.setPreference('sortWordListBy', event);
    this.preferences.sortWordListBy = event;
  }

  changeDisplaySize(size): void {
    this.dataService.setPreference('exploreDisplaySize', size);
    this.preferences.exploreDisplaySize = size;
  }

  changeStarSetting(setting): void {
    this.dataService.setPreference('useStarRating', setting);
    this.preferences.useStarRating = setting;
  }

}
