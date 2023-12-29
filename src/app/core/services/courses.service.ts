import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Courses } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = environment.backEndApi + "/api/course";


  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.apiUrl);
  }
  getCourse(id: number): Observable<Courses> {
    return this.http.get<Courses>(`${this.apiUrl}/${id}`);
  }

  addCourse(course: Courses, pictureFile: File): Observable<Courses> {
    const formData = new FormData();
    formData.append('title', course.title!);
    formData.append('price', course.price!.toString());
    formData.append('pictureFile', pictureFile);
    return this.http.post<Courses>(this.apiUrl, formData);
  }

  updateCourse(id: number, updatedCourses: Courses, pictureFile: File): Observable<Courses> {
    const formData = new FormData();
    formData.append('title', updatedCourses.title!);
    formData.append('price', updatedCourses.price!.toString());
    formData.append('pictureFile', pictureFile);
    return this.http.put<Courses>(`${this.apiUrl}/${id}`, formData);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  downloadImage(id: number): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'image/png' });
    return this.http.get(`${this.apiUrl}/picture/${id}`, { responseType: 'blob', headers });
  }
}

