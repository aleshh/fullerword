import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UtilitiesService } from '../../services/utilities.service';


interface Tag {
  tag: string,
  count: number,
  selected?: boolean
}
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {
  tagList: any[]; // .tag: string, .count: number, .selected?: boolean
  selectedTags: string[] = [];
  wordCount: number;

  constructor(
    private dataService: DataService,
    private utilities: UtilitiesService
  ) { }

  ngOnInit() {
    this.tagList = this.dataService.getTagList();
    this.selectedTags = this.dataService.getSelectedTags();

    for (let tag of this.tagList) {
      if (this.selectedTags.indexOf(tag.tag) > -1) {
        tag.selected = true;
      }
    }
    this.wordCount = this.dataService.getEntriesByTags(this.selectedTags).length;
    console.log('taglist: ', this.tagList.length);
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
    this.dataService.setSelectedTags(this.selectedTags);
    this.wordCount = this.dataService.getEntriesByTags(this.selectedTags).length;
  }

}
