import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {
  tagList: object[];
  selectedTags: string[] = [];
  wordCount: number;

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
      this.selectedTags.push(tag.tag);
    } else {
      if (tag.selected) {
        let index = this.selectedTags.indexOf(tag.tag);
        if (index > -1) {
          this.selectedTags.splice(index, 1);
        }
      } else {
        this.selectedTags.push(tag.tag);
      }
      tag.selected = !tag.selected;
    }
    this.wordCount = this.dataService.getEntriesByTags(this.selectedTags).length;
  }

}
