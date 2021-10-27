import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from '../../store/list/list.models';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // evita que la página se refresque constantemente
})
export class EmployeeComponent implements OnInit {

  @Input() employee!: User;

  constructor() { }

  ngOnInit(): void {
  }

}
