import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  OnInit,
  Input,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

type Role = 'Admin' | 'Professor' | 'Participant';

@Directive({
  selector: '[canSee]',
})
export class CanSeeDirective implements OnInit {
  @Input('canSee') rolesAndConditions: (Role | boolean)[] | boolean | Role;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (Array.isArray(this.rolesAndConditions)) {
      const roles = this.rolesAndConditions.filter(
        (rc) => typeof rc === 'string'
      ) as string[];

      if (this.rolesAndConditions.some((rc) => typeof rc === 'boolean' && rc)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else if (roles.some((role) => this.authService.roles.includes(role))) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    } else {
      if (
        (typeof this.rolesAndConditions === 'boolean' &&
          this.rolesAndConditions) ||
        this.authService.roles.includes(this.rolesAndConditions as string)
      ) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    }
  }
}
