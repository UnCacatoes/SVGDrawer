import { ImageService } from './image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  loadingImage = '<h1>Loading image</h1>';
  image: Element;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.imageService.get().then(
      res => {
        this.loadingImage = res.text();
        document.getElementById('imageContainer').innerHTML = this.loadingImage;
      });
  }

  createLine(x1: number, y1: number, x2: number, y2: number, color: string, width: string) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());
    line.style.stroke = color;
    line.style.strokeWidth = width;
    this.append(line);
  }

  createPath(...coords) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    for (let i = 0; i < coords.length; i++) {
      console.log(coords[i][0]);
      console.log(coords[i][1]);
    }
    path.setAttribute('d', 'M150 0 L75 200 L225 200 Z');
    this.append(path);
  }

  getImage() {
    return document.getElementsByTagName('svg')[0];
  }

  append(element: Element) {
    this.getImage().appendChild(element);
  }

  getElementAt(coords: number[]): HTMLElement {
    const element = <HTMLElement>document.elementFromPoint(coords[0], coords[1]);
    if (this.isPartOfImage(element)) {
      return element;
    }
    return null;
  }

  isPartOfImage(element: Element) {
    const children = this.getImage().children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === element.tagName) {
        return true;
      }
    }
    return false;
  }
}
