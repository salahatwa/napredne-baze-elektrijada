import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Roles } from 'src/app/services/auth/roles.enum';
import { UserForm } from 'src/app/models/UserFormComponent';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { SubsinkService } from 'src/app/services/subsink.service';
import { ImagePickerComponent } from 'src/app/feature-modules/shared/components/image-picker/image-picker.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [SubsinkService],
})
export class ProfileComponent extends UserForm implements OnInit {
  itsMe: boolean;
  isAdmin: boolean;
  rolesList = Object.keys(Roles).map((key) => Roles[key]);

  @ViewChild(ImagePickerComponent, { static: true })
  imagePicker: ImagePickerComponent;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private authService: AuthService,
    private subsink: SubsinkService
  ) {
    super(injector);

    this.isAdmin = this.authService.currentUser.roles.includes(Roles.ADMIN);

    this.subsink.add(
      this.route.paramMap.subscribe(
        (params) =>
          (this.itsMe = this.authService.currentUser._id === params.get('id'))
      )
    );
  }

  ngOnInit() {
    this.user = this.authService.currentUser;
    super.ngOnInit();
  }

  resetInitialForm() {
    this.userForm.reset(this.user);
    this.imagePicker.reset();
  }

  updateImage(base64: string) {
    this.userForm.markAsDirty();
    this.userForm.patchValue({ imageURL: base64 });
  }
}
