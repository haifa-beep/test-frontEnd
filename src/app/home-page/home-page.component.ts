import { Component, OnInit } from '@angular/core';
import { Observable, map, of, switchMap, toArray } from 'rxjs';
import { Courses } from '../core/models/course.model';
import { CoursesService } from '../core/services/courses.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  courses$!: Observable<Courses[]>;

  constructor(private courseService: CoursesService, private sanitizer: DomSanitizer) { } 

  ngOnInit() {
    this.getAllCourses()  
  }
  getAllCourses() {
    this.courseService.getAllCourses().subscribe((courses: Courses[]) => {
      courses.forEach((course: Courses) => {
        this.courseService.downloadImage(course.id!).subscribe((imageBlob: Blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageBlob);
          reader.onload = () => {
            const imageUrl = reader.result as string;
            course.picture = this.sanitizer.bypassSecurityTrustUrl(imageUrl) as SafeUrl;
          };
        });
      });
  
      this.courses$ = of(courses); 
    });
  }
}
