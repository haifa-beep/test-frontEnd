import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { AuthResponseDto } from 'src/app/core/models/AuthResponseDto.model';
import { UserLogin } from 'src/app/core/models/login.model';
import { UserEntity, Role } from 'src/app/core/models/user-entity.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {  registerForm: FormGroup = new FormGroup({});
user: UserLogin = new UserLogin();
errorMessage: string = '';
submitted = false;
private subscription: Subscription = new Subscription();

constructor(
  private userService: UserService,
  private router: Router,
  private formBuilder: FormBuilder,
  private notifier: NotifierService
) {
  this.registerForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
}

ngOnInit(): void {}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

get f() {
  return this.registerForm.controls;
}

onSubmit() {
  this.submitted = true;
  if (this.registerForm.invalid) {
    return;
  }
  const user: UserLogin = {
    email: this.registerForm.get('email')?.value,
    password: this.registerForm.get('password')?.value
  };
  this.subscription = this.userService.login(user).subscribe(
    (data: AuthResponseDto) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', data.userid);

      this.userService.getUserById(data.userid).subscribe(
        (userDetails: UserEntity) => {
          if (userDetails.role && userDetails.role.includes(Role.ADMIN)) {
            this.router.navigate(['/admin/courses']);
          } else if (userDetails.role && userDetails.role.includes(Role.USER)) {
            this.router.navigate(['']);
          } else {
            console.warn('Unsupported role:', userDetails.role);
          }
        },
        (error: any) => {
          console.error('Error fetching user details:', error);
        }
      );
    },
    (error: any) => {
      this.errorMessage = 'Invalid credentials';
      this.notifier.notify('error', this.errorMessage);
    }
  );
}
}
