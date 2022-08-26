import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAdmin = true;
  submitted: boolean;
  rememberMe: boolean;
  error: boolean;
  errorMessage: string;
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router,private route : ActivatedRoute) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }
  ngOnInit(): void {
  }
  login(form) {
    this.error = false;
    let user = {
      username: form.value.username,
      password: form.value.password
    }
    this.authService.login(user).subscribe(
      (res: any) => {
        if (res) {
          this.authService.setToken(res["accessToken"]);
          this.authService.setRole(res.roles);
          this.authService.setCurrentUserId(res);
          if (this.authService.isAdmin()) {
            localStorage.setItem('connect', 'true');
            this.isAdmin = true;
            this.router.navigate(['pages/dashboard']);
          }
          else {
            this.isAdmin = false;
            return;
          }
        } else {
          this.error = true;
        }
      },
      (err) => {
        this.error = true;
        this.errorMessage = "Invalid Credentials";
      }
    );
  }

}
