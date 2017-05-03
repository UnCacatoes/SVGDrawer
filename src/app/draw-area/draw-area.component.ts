import { ImageComponent } from './image/image.component';
import { ToolsBoxComponent } from './tools-box/tools-box.component';
import { Component, OnInit, ViewChild, AfterContentInit, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.css']
})
export class DrawAreaComponent implements OnInit {

  public cursorOnImage = false;
  public coords = [0, 0];
  private isMouseDown = false;
  private lastMouseEvent = '';
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  private coeffs: any;
  private oldValue;
  private selectedElement = null;

  @ViewChild(ImageComponent)
  private image: ImageComponent;

  @ViewChild(ToolsBoxComponent)
  private toolsBox: ToolsBoxComponent;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseup', ['$event'])
  onMouseup(event: MouseEvent) {
    this.lastMouseEvent = 'mouseUp';
    this.isMouseDown = false;
    this.actions(event);
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.lastMouseEvent = 'mouseMove';
    this.updateCoords(event);
    if (this.isMouseDown) {
      this.actions(event);
    } else {
      
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.lastMouseEvent = 'mouseDown';
    this.isMouseDown = true;
    this.actions(event);
  }

  updateCoords(event: MouseEvent) {
    this.coords = [event.clientX, event.clientY];
  }

  actions(event: MouseEvent) {
    if (this.isCursorOnImage(event)) {
      switch (this.toolsBox.getSelectedTool()) {
        case 'translate':
          this.translateAction();
          break;
        case 'rotate':
          this.rotateAction();
          break;
        case 'drawLine':
          this.drawLineAction();
          break;
        case 'drawCircle':
          this.drawCircleAction();
          break;
        case 'delete':
          this.deleteAction();
          break;
      }
    }
  }

  isCursorOnImage(event: MouseEvent) {
    return this.cursorOnImage;
  }
  translateAction() {
    if (this.image.getElementAt(this.coords) === null) {
      return;
    }
    switch (this.lastMouseEvent) {

      case 'mouseDown':
        this.selectedElement = this.image.getElementAt(this.coords);
        this.x2 = this.coords[0];
        this.y2 = this.coords[1];
        let transform = null;
        if (this.selectedElement.getAttribute('transform') == null) {
          transform = 'translate(0 0)';
        } else {
          transform = this.selectedElement.getAttribute('transform');
        }
        transform = transform.substring(10, transform.length - 1);
        if (transform.indexOf(',') > 0) {
          this.coeffs = transform.split(',');
        } else {
          this.coeffs = transform.split(' ');
        }
        this.x1 = parseInt(this.coeffs[0]);
        this.y1 = parseInt(this.coeffs[1]);
        break;

      case 'mouseMove':
        if (this.selectedElement == null) {
          break;
        }
        const x = this.coords[0];
        const y = this.coords[1];
        this.coeffs[0] = x + this.x1 - this.x2;
        this.coeffs[1] = y + this.y1 - this.y2;
        const chaine = 'translate(' + this.coeffs.join(' ') + ')';
        this.selectedElement.setAttribute('transform', chaine);
        break;

      case 'mouseUp':
        break;
    }

  }

  rotateAction() {

    switch (this.lastMouseEvent) {

      case 'mouseDown':
        this.selectedElement = this.image.getElementAt(this.coords);
        if (!(this.selectedElement.getAttribute('transform') == null)) {
          this.oldValue = this.selectedElement.getAttribute('transform');
        } else {
          this.oldValue = '';
        }
        this.x1 = this.coords[0];
        this.y1 = this.coords[1];
        break;

      case 'mouseMove':
        this.x2 = this.coords[0];
        this.y2 = this.coords[1];
        const value = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
        const rotate = this.oldValue + 'rotate(' + value + ' ' + this.x1 + ' ' + this.y1 + ' )';
        this.selectedElement.setAttribute('transform', rotate);
        break;

      case 'mouseUp':
        this.selectedElement = null;
        break;
    }
  }

  drawLineAction() {

    switch (this.lastMouseEvent) {

      case 'mouseDown':
        this.selectedElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.selectedElement.setAttribute('x1', this.coords[0].toString());
        this.selectedElement.setAttribute('y1', this.coords[1].toString());
        this.selectedElement.setAttribute('x2', this.coords[0].toString());
        this.selectedElement.setAttribute('y2', this.coords[1].toString());
        this.selectedElement.setAttribute('stroke-width', this.toolsBox.getLineProperties().thickness);
        this.selectedElement.setAttribute('stroke', 'black');
        this.image.append(this.selectedElement);

        break;

      case 'mouseMove':
        this.selectedElement.setAttribute('x2', this.coords[0].toString());
        this.selectedElement.setAttribute('y2', this.coords[1].toString());
        break;

      case 'mouseUp':
        this.selectedElement = null;
        break;
    }

  }

  drawCircleAction() {

    switch (this.lastMouseEvent) {

      case 'mouseDown':
        this.selectedElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.x1 = this.coords[0];
        this.y1 = this.coords[1];
        this.selectedElement.setAttribute('cx', this.x1.toString());
        this.selectedElement.setAttribute('cy', this.y1.toString());
        this.selectedElement.setAttribute('r', '0');
        this.selectedElement.setAttribute('stroke-width', this.toolsBox.getLineProperties().thickness);
        this.selectedElement.setAttribute('stroke', 'black');
        this.image.append(this.selectedElement);

        break;

      case 'mouseMove':
        this.x2 = this.coords[0];
        this.y2 = this.coords[1];
        const radius = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
        this.selectedElement.setAttribute('r', radius.toString());
        break;

      case 'mouseUp':
        this.selectedElement = null;
        break;
    }

  }

  deleteAction() {

    switch (this.lastMouseEvent) {
      case 'mouseDown':
        const element = this.image.getElementAt(this.coords);
        element.outerHTML = '';
        break;
    }
  }

  download() {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.image.getImage().outerHTML));
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
