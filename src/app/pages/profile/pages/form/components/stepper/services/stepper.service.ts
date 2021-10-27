import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep extends Step {
  index: number;
}

@Injectable()
export class StepperService {

  steps!: Step[];
  activeStep!: ActiveStep;

  next = new Subject<boolean>(); // enviá datos
  next$!: Observable<boolean>; // recibe datos

  prev = new Subject<void>(); // enviá datos
  prev$ = this.prev.asObservable(); // recibe datos, se dispara con una condición

  complete = new Subject<boolean>(); // enviá datos
  complete$!: Observable<boolean>; // recibe datos

  cancel = new Subject<void>(); // enviá datos
  cancel$ = this.cancel.asObservable(); // recibe datos, se dispara con una condición

  check = new Subject<'next' | 'complete'>(); // enviá datos
  check$ = this.check.asObservable(); // recibe datos, se dispara con una condición

  init(steps: Step[]): void {
    this.steps = steps;
    this.activeStep = {...steps[0], index: 0};
  }

  constructor() {
    this.next$ = this.next.asObservable().pipe(filter(isOk => isOk));
    this.complete$ = this.complete.asObservable().pipe(filter(isOk => isOk));
  }

  onNext(): void {
    const index = this.activeStep.index + 1;
    this.activeStep = {...this.steps[index], index};
  }

  onPrev(): void {
    const index = this.activeStep.index - 1;
    this.activeStep = {...this.steps[index], index};
  }

}
