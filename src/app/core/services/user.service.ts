import { Injectable } from '@angular/core';
import { UserEntity } from '../models/user-entity.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserEntity } from '../interfaces/user.interface';
import { UserLogin } from '../models/login.model';
import { AuthResponseDto } from '../models/AuthResponseDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.backEndApi + "/api/auth";


  constructor(private http: HttpClient) { }

  registerUser(user: IUserEntity): Observable<String> {
    return this.http.post<String>(`${this.apiUrl}/register`, user, { responseType: 'text' as 'json' });
  }
  
  login(loginDto: UserLogin): Observable<AuthResponseDto> {
    return this.http.post(`${this.apiUrl}/login`, loginDto) as Observable<AuthResponseDto>;
  }

  isAuthenticated (): boolean {
    let userId = localStorage.getItem('userId') || null
    if (userId) return true;
    return false;
  }

  getUserById(id: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.apiUrl}/${id}`);
  }
}
