import { Component, OnInit } from '@angular/core';
import { } from 'ng-boostrap';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  private selectedTool: string;
  public lineProperties: { thickness: string };
  public color;

  constructor() { }

  ngOnInit() {
  }
}
