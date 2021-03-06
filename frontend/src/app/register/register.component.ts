import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataService} from '../data.service';
import { JwtService} from '../jwt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: Object;
  registerForm: FormGroup;
  submitted = false;
  success = false;
  logged = false;

  constructor(private formBuilder: FormBuilder, private data: DataService, private jwt: JwtService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      agree: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.controls.username.value);
    this.success = true;
    this.data.addUser(this.registerForm.controls.username.value, this.registerForm.controls.password.value,
      this.registerForm.controls.name.value, this.registerForm.controls.email.value, false).subscribe(data => {
        this.user = data;
        this.logged = true;
        console.log(this.user);
        this.jwt.login(this.registerForm.controls.username.value, this.registerForm.controls.password.value).subscribe(ddata => {
          console.log(ddata['token']);
        }, error => { this.logged = false; alert('Ωχχχχ'); });
      }
    );

  }

  retry() {
    location.reload();
  }
}
