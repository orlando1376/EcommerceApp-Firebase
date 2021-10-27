import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/store/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // evita que la página se refresque constantemente
})
export class HeaderComponent implements OnInit {

  @Input() isAuthorized!: boolean | null;
  @Input() user!: User | null;
  @Output() signOut = new EventEmitter<void>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSignOut() {
    this.signOut.emit();
  }

  onProfileNavigate(): void {
    // si el usuario existe lo edita si no lo lleva a la pantalle de creación
    const path = this.user ? this.user.uid : 'new';
    this.router.navigate(['/profile', path]);
  }
}
