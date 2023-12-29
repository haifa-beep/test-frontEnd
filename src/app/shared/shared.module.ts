import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReviewTestmonialComponent } from './components/review-testmonial/review-testmonial.component';
import { BlogComponent } from './components/blog/blog.component';
import { RouterModule } from '@angular/router';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { NotifierOptions } from 'angular-notifier';
import { ImageCropperModule } from 'ngx-image-cropper';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete'; 

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const customNotifierOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: 'right',
          distance: 20,
      },
      vertical: {
          position: 'top',
          distance: 100,
          gap: 10,
      },
  },
  theme: 'material',
  behaviour: {
      autoHide: 5000,
      onClick: 'hide',
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4,
  },
  animations: {
      enabled: true,
      show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease',
      },
      hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50,
      },
      shift: {
          speed: 300,
          easing: 'ease',
      },
      overlap: 150,
  },
};


@NgModule({
  declarations: [
    ReviewTestmonialComponent,
    BlogComponent,
    OfferCardComponent,
    SwitcherComponent,
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    RouterModule,
    FullCalendarModule,
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientModule,  ],
  exports: [
    FeatherModule,
    ReviewTestmonialComponent,
    BlogComponent,
    RouterModule,
    OfferCardComponent,
    SwitcherComponent,
    FullCalendarModule,
    MatTableModule, 
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule,
    ImageCropperModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
  ],
})
export class SharedModule { }
