import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  sampleDataLoaded: boolean;
  sortWordListBy: string;
  exploreDisplaySize: string;
  useStarRating: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.sampleDataLoaded = this.dataService.getPreference('sampleDataLoaded');
    this.sortWordListBy = this.dataService.getPreference('sortWordListBy');
    this.exploreDisplaySize = this.dataService.getPreference('exploreDisplaySize');
    this.useStarRating = this.dataService.getPreference('useStarRating');
    // console.log('sampleDataLoaded: ', this.sampleDataLoaded );
  }

  loadSampleData(): void {
    this.dataService.loadSampleData();
    this.sampleDataLoaded = true;
  }

  removeSampleData(): void {
    this.dataService.removeSampleData();
    this.sampleDataLoaded = false;
  }

  changeSort(event): void {
    this.dataService.setPreference('sortWordListBy', event);
    this.sortWordListBy = event;
  }

  changeDisplaySize(size): void {
    this.dataService.setPreference('exploreDisplaySize', size);
    this.exploreDisplaySize = size;
  }

  changeStarSetting(setting): void {
    this.dataService.setPreference('useStarRating', setting);
    this.useStarRating = setting;
  }

}
