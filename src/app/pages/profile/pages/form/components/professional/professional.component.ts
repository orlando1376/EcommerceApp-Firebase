import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { markFormGroupTouched } from '@app/shared';
import { StepperService } from '../stepper/services';
import { Dictionaries } from '@app/store/dictionaries';
import { regexErrors } from '@app/shared/utils';
import { RecruiterForm } from './roles/recruiter/recruiter.component';
import { EmployeeForm } from './roles/employee/employee.component';

export interface ProfesionalForm {
  about?: string | null;
  roleId?: string | null;
  role?: RecruiterForm | EmployeeForm | null;
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // evita que la página se refresque constantemente
})
export class ProfessionalComponent implements OnInit, OnDestroy {

  @Input() value!: ProfesionalForm | any;
  @Input() dictionaries!: Dictionaries | null;
  @Output() changed = new EventEmitter<ProfesionalForm>();

  form!: FormGroup;
  regexErrors = regexErrors;

  private destroy = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private stepper: StepperService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      roleId: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      about: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }]
    });

    // si está editando
    if(this.value) {
      this.form.patchValue(this.value);
    }

    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      // type === 'complete'

      if (!this.form.valid) {
        markFormGroupTouched(this.form);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
      } else {
        this.changed.emit(this.form.value);
      }

      this.stepper[type].next(this.form.valid);
    })
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
