import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools-box',
  templateUrl: './tools-box.component.html',
  styleUrls: ['./tools-box.component.css']
})
export class ToolsBoxComponent implements OnInit {

  private selectedTool: string;
  private lineProperties: { thickness: string };

  constructor() { }

  ngOnInit() {
    this.selectedTool = 'translate';
    this.lineProperties = { thickness: '1' };
  }

  getSelectedTool() {
    console.log(this.lineProperties.thickness);
    return this.selectedTool;
  }

  getLineProperties() {
    return this.lineProperties;
  }

}
