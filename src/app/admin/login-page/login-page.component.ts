import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('admin@test.test', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(3)])
    })

  }

  submit() {
    console.log(this.form);

    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['admin', 'dashboard']);
      this.submitted = false;
    },
      () => this.submitted = false);


  }

}
