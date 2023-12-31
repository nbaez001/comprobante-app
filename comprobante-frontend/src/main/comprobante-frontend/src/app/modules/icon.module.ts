import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    MaterialModule,
  ]
})
export class IconModule {
  private path: string = './assets/images/svg-icons';

  constructor(private domSanitizer: DomSanitizer, public matIconRegistry: MatIconRegistry) {
    this.matIconRegistry
      .addSvgIcon('excel', this.setIconPath(`${this.path}/icons8-microsoft-excel.svg`));
  }

  private setIconPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
