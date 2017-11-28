import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Entry } from '../../models/Entry';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html'
})
export class EntryDetailComponent implements OnInit {
  entry: Entry;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.getEntry();
  }

  getEntry(): void {
    let routeText = this.route.snapshot.paramMap.get('text');
    routeText = this.utilities.decodeUrl(routeText);
    this.entry = this.dataService.getEntry(routeText);
    // console.log('entry loaded: ', this.entry);
    // console.log('dateAdded: ',this.entry.dateAdded );
    // console.log('dateAdded type: ', typeof( this.entry.dateAdded) );
    // this.entry.dateAdded = new Date(this.entry.dateAdded);
    // console.log('dateAdded: ',this.entry.dateAdded );
    // console.log('dateAdded type: ', typeof( this.entry.dateAdded) );
    console.log('dateAdded: ',this.entry.dateAdded );
    console.log('dateAccesed: ',this.entry.dateAccessed );
    console.log('dateModified: ',this.entry.dateModified );
  }

  editEntry(): void {
    let encodedUrl = this.utilities.encodeUrl(this.entry.text);
    this.router.navigate(['edit/', encodedUrl]);
  }

}
