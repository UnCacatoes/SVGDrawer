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
