import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserEntity } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private modalService: NgbModal,
    private notifier: NotifierService,
    private router: Router,
  ) { 
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
      
  });
  }

  ngOnInit() {    
    console.log("Register form initialized  ");
    }
  
  get f() { return this.registerForm.controls; }

  onSubmit() {  
    this.submitted = true;
    if (this.registerForm.invalid) {      
        return;
    }
  
  const user: IUserEntity = {
    firstname: this.registerForm.get('first_name')?.value,
    lastname: this.registerForm.get('last_name')?.value,
    email: this.registerForm.get('email')?.value,
    password: this.registerForm.get('password')?.value,
    role: this.registerForm.get('role')?.value
  };  
  this.userService.registerUser(user).subscribe(
    (response: any) => {
      if (response === 'User registered successfully!') {
        this.submitted = false;
        this.router.navigate(['/auth','login']);
      } else {
        this.notifier.notify('error', 'Registration Failed');
      }
    }
  );
}




}


{ message: "success" }


