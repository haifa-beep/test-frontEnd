import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Courses } from 'src/app/core/models/course.model';
import { CoursesService } from 'src/app/core/services/courses.service';
@Component({
  selector: 'app-create-company',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
   courseForm!: FormGroup;
  submitted = false;
  course?: Courses;
  file?: File;
  pictureUrl?: any;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
     private sanitizer: DomSanitizer
   ) { }

   ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    const id = parseInt(courseId!, 10);
     this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      picture: [''],
     })

     if (id) {
       this.readCourseById(id)
      }
  
   }

   get f() { return this.courseForm?.controls; }

   onSubmit() {
    this.submitted = true;

    if (this.courseForm?.invalid) {
      return;
    }
   
    const course: Courses = {
      title: this.courseForm.get('title')?.value,
      price: this.courseForm.get('price')?.value,
      }
      if (!this.course) {
        this.courseService.addCourse(course, this.file!).subscribe(
          (response: Courses) => {
            this.submitted = false;
            this.courseForm.reset();
            this.pictureUrl = ''
            this.notifier.notify('success', 'Course successfully added');
          },
          error => {
            this.notifier.notify('error', 'Registration Failed');
          }
        );
      } else {
        const corseId = this.route.snapshot.paramMap.get('id');
        const id = parseInt(corseId!, 10);
  
      if (this.file) {
        this.courseService.updateCourse(id, course, this.file).subscribe(
          (response: Courses) => {
            this.notifier.notify('success', 'Course successfully updated');
          },
          error => {
            this.notifier.notify('error', 'Registration Failed');
          });
      } else {
        this.courseService.downloadImage(id!).subscribe(
          (imageData: Blob) => {
            const fileName = 'existing_picture.jpg'; 
            const file = new File([imageData], fileName);
            this.courseService.updateCourse(id,course, file).subscribe(
              (response: Courses) => {
                this.notifier.notify('success', 'Course successfully updated');
              },
              error => {
                this.notifier.notify('error', 'Registration Failed');
              }
            );
          }
        );
      }
      }
    }


    readCourseById(id: number) {
      this.courseService.getCourse(id).subscribe((response: Courses) => {
        this.course = new Courses(response);
        this.courseService.downloadImage(id).subscribe(
          (imageData: Blob) => {
            this.createImageFromBlob(imageData);
          },
          (error) => {
            this.notifier.notify('error', 'Error fetching picture data');
          }
        );
        this.courseForm.patchValue({
          title: this.course.title,
          price: this.course.price,
        });
      });
    }
    createImageFromBlob(image: Blob): void {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const imageUrl = reader.result as string;
        this.pictureUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      }, false);
    
      if (image) {
        reader.readAsDataURL(image);
      }
    }
    
      onFileChange(event: any): void {
        this.file = event.target.files[0];
        if (this.file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.pictureUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
        };
        reader.readAsDataURL(this.file);
      }
      }
    }



