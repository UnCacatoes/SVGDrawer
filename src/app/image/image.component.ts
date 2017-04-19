import { ImageService } from './image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  img = '<h1>Loading image</h1>';

  constructor(private imageService: ImageService) {

  }

  ngOnInit() {
    this.imageService.get().then(
      res => {
        document.getElementById('imageContainer').innerHTML = res.text();
      });
  }

}
