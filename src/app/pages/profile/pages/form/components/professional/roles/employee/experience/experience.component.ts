import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export interface ExperienceForm {
  companyName: string;
  period: Period;
}

export interface Period {
  from: number;
  to: number;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {

  @Input() public parent!: FormGroup;
  @Input() public name!: string;
  @Input() public values!: ExperienceForm[];

  form!: FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.values = this.values ? this.values : [];
    this.init();
  }

  ngOnDestroy(): void {
    // remover controles del formulario padre
    this.parent.removeControl(this.name);
  }

  private init() {
    this.form = this.fb.array(this.getFormGroupArray(this.values));

    // agregar los controles al padre
    this.parent.addControl(this.name, this.form);
  }

  private getFormGroupArray(value: ExperienceForm[]): FormGroup[] {
    if (!this.values.length) {
      return [this.getFormGroup()];
    } else {
      return value.map( value => this.getFormGroup(value));
    }
  }

  private getFormGroup(value?: ExperienceForm): FormGroup {
    const group = this.fb.group({
      companyName: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }],
      period: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }]
    });

    // si está editando
    if(value) {
      group.patchValue(value);
    }

    return group;
  }

  addExperience(): void {
    this.form.push(this.getFormGroup());
  }

  deleteExperience(i: number): void {
    this.form.removeAt(i);
  }

  getControls() {
    return (this.parent.get(this.name) as FormArray).controls;
  }

  getControl(control: any, name: string) {
    return control.get('controls')?.get(name) as FormControl;
  }
}
