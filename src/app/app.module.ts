import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ImageService } from './draw-area/image/image.service';
import { ImageComponent } from './draw-area/image/image.component';
import { DrawAreaComponent } from './draw-area/draw-area.component';
import { ToolsBoxComponent } from './draw-area/tools-box/tools-box.component';
import { MenuBarComponent } from './draw-area/menu-bar/menu-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    DrawAreaComponent,
    ToolsBoxComponent,
    MenuBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
