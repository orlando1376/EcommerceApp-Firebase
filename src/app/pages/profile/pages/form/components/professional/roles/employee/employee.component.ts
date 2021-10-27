import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Dictionaries } from '@app/store/dictionaries';
import { RecruiterForm } from '../recruiter/recruiter.component';
import { ExperienceForm } from './experience/experience.component';
import { ControlEntities, mapControls } from '@app/shared/utils/form';

export interface EmployeeForm {
  specialization: string | null;
  skills: string[];
  qualification: string | null;
  expectedSalary: number;
  experiences: ExperienceForm[] | any[];
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  @Input() parent!: FormGroup;
  @Input() name!: string;
  @Input() value!: EmployeeForm | RecruiterForm;
  @Input() dictionaries!: Dictionaries | null;

  form!: FormGroup;
  controls!: ControlEntities;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      expectedSalary: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }],
      specialization: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      qualification: [{value: null, disabled: true}, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      skills: [{value: null, disabled: true}, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
    })

    this.controls = {
      specialization: {
        items: this.dictionaries?.specializations.controlItems,
        changed: () => {
          // disparar los eventos
          this.controls.qualification.map();
          this.controls.skills.map();
        }
      },
      qualification: {
        items: this.dictionaries?.qualifications.controlItems,
        map: () => {
          if (this.form.value.specialization) {
            this.form.controls.qualification.enable();
          } else {
            this.form.controls.qualification.reset();
            this.form.controls.qualification.disable();
          }
        }
      },
      skills: {
        items: this.dictionaries?.skills.controlItems,
        map: () => {
          if (this.form.value.specialization) {
            this.form.controls.skills.enable();

            const items = [...this.dictionaries?.skills.controlItems || []].map(
              (item, index) => ({...item, label: `${item.label} (${index + 1})`})
            )
            this.controls.skills.items =items;
          } else {
            this.form.controls.skills.reset();
            this.form.controls.skills.disable();
          }
        }
      }
    }

    // si está editando
    if(this.value) {
      this.form.patchValue(this.value);
    }

    // si está editando
    mapControls(this.controls);

    // agregar los controles al padre
    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    // remover controles del formulario padre
    this.parent.removeControl(this.name);
  }
}
