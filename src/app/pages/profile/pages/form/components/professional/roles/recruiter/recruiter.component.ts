import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Dictionaries } from '@app/store/dictionaries';
import { EmployeeForm } from '../employee/employee.component';
import { ExperienceForm } from '../employee/experience/experience.component';

export interface RecruiterForm {
  companyName: string;
  employeesCount: number;
  experiences: ExperienceForm[];
}

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class RecruiterComponent implements OnInit, OnDestroy {

  @Input() parent!: FormGroup;
  @Input() name!: string;
  @Input() value!: RecruiterForm | EmployeeForm;
  @Input() dictionaries!: Dictionaries | null;

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      companyName: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }],
      employeesCount: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }],
    })

    // si está editando
    if(this.value) {
      this.form.patchValue(this.value);
    }

    // agregar los controles al padre
    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    // remover controles del formulario padre
    this.parent.removeControl(this.name);
  }
}
