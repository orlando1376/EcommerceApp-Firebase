import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { markFormGroupTouched } from '@app/shared';
import { StepperService } from '../stepper/services';
import { Dictionaries } from '@app/store/dictionaries';

export interface PersonalForm {
  name: string | null;
  photoURL: string | null;
  country?: string | null;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // evita que la página se refresque constantemente
})
export class PersonalComponent implements OnInit, OnDestroy {

  @Input() value!: PersonalForm;
  @Input() dictionaries!: Dictionaries | null;
  @Output() changed = new EventEmitter<PersonalForm>();

  form!: FormGroup;

  private destroy = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private stepper: StepperService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      photoURL: [null],
      name: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(128)
        ]
      }],
      country: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }]
    });

    // si está editando
    if(this.value) {
      this.form.patchValue(this.value);
    }

    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      // type = 'next'

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

  onPhotoChanged(url: any): void {
    console.log('url', url);
    if (url) {
      this.form.controls.photoURL.setValue(url);
    }
  }
}
