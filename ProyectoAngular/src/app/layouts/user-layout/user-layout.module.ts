import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLayoutRoutes } from './user-layout.routing';
import { PackagesComponent } from 'src/app/pages/packages/packages.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PictureComponent } from 'src/app/components/picture/picture.component';
import { PackageComponent } from 'src/app/components/package/package.component';
import { SentComponent } from 'src/app/pages/sent/sent.component';
import {MatSelectModule} from '@angular/material/select';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from 'src/app/pages/landing-page/landing-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild( UserLayoutRoutes ),
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    PackagesComponent,
    PictureComponent,
    PackageComponent,
    SentComponent,
    CarouselComponent,
    LandingPageComponent
  ]
})
export class UserLayoutModule { }
