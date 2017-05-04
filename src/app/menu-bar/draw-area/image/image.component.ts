import { ImageService } from './image.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {

  loadingImage = '<h1>Loading image</h1>';
  @ViewChild('image') image; 

  constructor(private imageService: ImageService) {
  }

  getImage() : SVGElement{
    return this.image.nativeElement;
  }

  append (element: Element){
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

  newImage(){
    this.getImage().innerHTML="";
  }
}
