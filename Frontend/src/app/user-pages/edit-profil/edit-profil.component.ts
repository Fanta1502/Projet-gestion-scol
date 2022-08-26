import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {
  user: any;
  file: File;
  fileName: string = "No file selected";
  image: String | ArrayBuffer = "../../../assets/images/profil.jpg";
  editForm: FormGroup;
  submitted = false;
  success = false;
  constructor(private location: Location, private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {

    this.authService.getUser(localStorage.getItem("id")).subscribe
      ((res: any) => {
        this.user = res;
        if (res.profilPicture) {
          this.image = "data:image/jpeg;base64," + this.user.profilPicture;
          this.user.profilPicture = this.image;
        }
      }
      )
  }
  ngOnInit(): void {
    this.editForm = new FormGroup({
      email: new FormControl("",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ),
      prenom: new FormControl("", Validators.required),
      nom: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
    })
  }
  get getForm() {
    if (this.user) {
      return this.editForm.controls;
    }
  }
  imageChange(file) {
    if (file) {
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.image = reader.result;
        this.user.profilPicture = reader.result;
      }
    }
  }
  back() {
    this.location.back();
    return false;
  }
  onSubmit(form: FormGroup) {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    let user =
    {
      id: this.user.id,
      email: form.value.email,
      prenom: this.user.prenom,
      nom: this.user.nom,
      username: this.user.username,
      profilPicture: this.image.slice("data:image/jpeg;base64,".length)
    }
    this.authService.editUserSettings(user).subscribe(
      res => {
        if (res) {
          this.success = true;
          this.router.navigate(["pages/dashboard"]);
        }
        else {
        }
      }
    )
  }
}
