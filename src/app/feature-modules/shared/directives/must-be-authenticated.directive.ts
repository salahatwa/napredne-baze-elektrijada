import {
  Directive,
  OnInit,
  Input,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Directive({
  selector: '[mustBeAuthenticated]',
})
export class MustBeAuthenticatedDirective implements OnInit {
  @Input('mustBeAuthenticated') mustBeAuthenticated = true;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.mustBeAuthenticated === this.authService.isAuthenticated) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
