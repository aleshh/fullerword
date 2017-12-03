import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {
  tagList: object[];

  constructor(
    private dataService: DataService,
    private utilities: UtilitiesService
  ) { }

  ngOnInit() {
    this.tagList = this.dataService.getTagList();
  }

  toggleTag(tag: any):void {
    if (tag.selected == undefined) {
      tag.selected = true;
    } else {
      tag.selected = !tag.selected;
    }
    console.log('tag toggled: ', tag );
  }

}
