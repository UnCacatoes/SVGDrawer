import { ImageComponent } from './image/image.component';
import { Component, OnInit, ViewChild, AfterContentInit, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.css']
})
export class DrawAreaComponent implements OnInit {
  coeffs: any;

  private mouseUp = new EventEmitter<MouseEvent>();
  private mouseDown = new EventEmitter<MouseEvent>();
  private MouseMove = new EventEmitter<MouseEvent>();
  private isMouseDown = false;
  private lastMouseEvent = '';
  public coords = [0, 0];
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  private selectedTool = 'move';
  private selectedElement: HTMLElement = null;

  @ViewChild(ImageComponent)
  private image: ImageComponent;


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
    switch (this.selectedTool) {
      case 'move': this.moveAction();
        break;
    }
  }

  moveAction() {

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


}
