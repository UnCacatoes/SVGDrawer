import { ImageComponent } from './image/image.component';
import { ToolsBoxComponent } from './tools-box/tools-box.component';
import { Component, OnInit, ViewChild, AfterContentInit, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.css']
})
export class DrawAreaComponent implements OnInit {

  public coords = [0, 0];
  private mouseUp = new EventEmitter<MouseEvent>();
  private mouseDown = new EventEmitter<MouseEvent>();
  private MouseMove = new EventEmitter<MouseEvent>();
  private isMouseDown = false;
  private lastMouseEvent = '';
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  private coeffs: any;
  private selectedElement = null;

  @ViewChild(ImageComponent)
  private image: ImageComponent;

  @ViewChild(ToolsBoxComponent)
  private toolsBox: ToolsBoxComponent;

  constructor() { }

  ngOnInit() {
    this.MouseMove.subscribe();
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
    if (this.isMouseDown) {
      this.actions(event);
    } else {
      this.updateCoords(event);
    }
  }

  @HostListener('mousedown', ['$event'])
  mouseHandling(event) {
    this.lastMouseEvent = 'mouseDown';
    this.isMouseDown = true;
    this.actions(event);
  }

  updateCoords(event: MouseEvent) {
    this.coords = [event.clientX, event.clientY];
  }

  actions(event: MouseEvent) {
    this.updateCoords(event);
    switch (this.toolsBox.getSelectedTool()) {
      case 'translate':
        this.translateAction();
        break;
      case 'rotate':
        this.rotateAction();
        break;
      case 'drawLine':
        this.drawLine();
        break;
    }
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
    // TODO
  }

  drawLine() {

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
        break;
    }

  }
}
