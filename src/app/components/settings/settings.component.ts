import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  sampleDataLoaded: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.sampleDataLoaded = this.dataService.getPreference('sampleDataLoaded');
    console.log('sampleDataLoaded: ', this.sampleDataLoaded );
  }

  loadSampleData(): void {
    this.dataService.loadSampleData();
    this.sampleDataLoaded = true;
  }

  removeSampleData(): void {
    this.dataService.removeSampleData();
    this.sampleDataLoaded = false;
  }

}
