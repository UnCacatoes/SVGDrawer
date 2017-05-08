import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools-box',
  templateUrl: './tools-box.component.html',
  styleUrls: ['./tools-box.component.css']
})
export class ToolsBoxComponent implements OnInit {

  private selectedTool: string;
  public lineProperties: { thickness: string };
  private color;

  constructor() { }

  ngOnInit() {
    this.selectedTool = 'translate';
    this.lineProperties = { thickness: '10' };
  }

  getSelectedTool() {
    return this.selectedTool;
  }

  getLineProperties() {
    return this.lineProperties;
  }

  getColor() {
    return this.color;
  }
}
