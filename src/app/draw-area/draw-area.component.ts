import { ImageComponent } from './image/image.component';
import { Component, OnInit, ViewChild, AfterContentInit, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.css']
})
export class DrawAreaComponent implements OnInit {

  private mousedrag = new EventEmitter();
  private mouseup = new EventEmitter<MouseEvent>();
  private mousedown = new EventEmitter<MouseEvent>();
  private mousemove = new EventEmitter<MouseEvent>();
  private isMouseDown = false;
  public coords = [0, 0];
  private selectedTool = "move";

  private last: MouseEvent;
  private el: HTMLElement;

  @ViewChild(ImageComponent)
  private image: ImageComponent;


  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseup', ['$event'])
  onMouseup(event: MouseEvent) {
    this.action();
    this.isMouseDown = false;
    this.mousedown.unsubscribe();
    // console.log('mouseup', event);
    this.updateCoords(event);

  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.action();
    if (this.isMouseDown) {
      this.mousemove.emit(event);
      // console.log('mousemove', event);
      this.updateCoords(event);
    }
  }

  @HostListener('mousedown', ['$event'])
  mouseHandling(event) {
    this.action();
    this.isMouseDown = true;
    event.preventDefault();
    // console.log('mousedown', event);
    this.updateCoords(event);
    this.mousemove.subscribe();
  }

  updateCoords(event: MouseEvent) {
    this.coords = [event.clientX, event.clientY];
    console.log(this.coords);
  }

  action() {
    if (this.selectedTool === 'move') {
      this.image.getElementAt();
    }
  }

}
