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

  save(){
    let image = document.getElementsByTagName("svg")[0].outerHTML;
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(image));
    pom.setAttribute('download', "svg.svg");

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
  }
}
