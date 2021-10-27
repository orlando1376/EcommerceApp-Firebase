import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../../../store/user';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // evita que la página se refresque constantemente
})
export class EmployeeComponent implements OnInit {

  @Input() role!: Employee | any;

  constructor() { }

  ngOnInit(): void {
  }

}
