import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Courses } from 'src/app/core/models/course.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-companies-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.scss']
})
export class CourseAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'price', 'picture', 'actions'];
  dataSource = new MatTableDataSource<Courses>
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pictureUrl?: any;

  constructor(
    private courseService: CoursesService,
    private _liveAnnouncer: LiveAnnouncer,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.getAllCourses ()
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) this.dataSource.paginator = this.paginator;
  }

  getAllCourses() {
    this.courseService.getAllCourses()
      .subscribe((courses: Courses[]) => {
        courses.map((course: Courses) => {
          this.courseService.downloadImage(course.id!).subscribe((imageBlob: Blob) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              const imageUrl = reader.result as string;
              course.picture = this.sanitizer.bypassSecurityTrustUrl(imageUrl) as SafeUrl;
              this.dataSource.data = [...this.dataSource.data];
            }, false);

            if (imageBlob) {
              reader.readAsDataURL(imageBlob);
            }
          });
        });

        this.dataSource = new MatTableDataSource(courses);
      });
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteCourse(courseid: string) {  
    Swal.fire({
      title: 'Are you sure you want to delete this Course?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {  
    this.courseService.deleteCourse(courseid).subscribe((response) => {
      console.log(response);
      window.location.reload();
      
    })
  }

    });
  }



}