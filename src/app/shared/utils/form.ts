import { ControlItem } from '@app/models/frontend';

export const markFormGroupTouched = (formGroup: any) => {
  (Object as any).values(formGroup.controls).forEach((control: any) => {
    control.markAsTouched();

    // si el control tiene un formGroup
    if (control.controls) {
      markFormGroupTouched(control);
    }
  })
}

export interface Control {
  items?: ControlItem[];
  changed?: () => void; // cuando se dispara
  map?: (() => void) | any; // cuando se recibe
}

export interface ControlEntities {
  [key: string]: Control;
}

export const mapControls = (controls: ControlEntities): void => {
  Object.keys(controls).forEach((key) => {
    if (controls[key].map) {
      controls[key].map();
    }
  })
}
