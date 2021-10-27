import { Injectable } from '@angular/core';
import { ProfileForm } from '../../form.component';
import { EmployeeForm } from '../../components/professional/roles/employee/employee.component';
import { RecruiterForm } from '../../components/professional/roles/recruiter/recruiter.component';
import { User, UserCreateRequest, Employee, Recruiter } from '@app/store/user';
import { Dictionaries } from '@app/store/dictionaries';

@Injectable()
export class MapperService {

  constructor() { }

  userToForm(user: User): ProfileForm {
    return {
      personal: {
        name: user ? user.name : null,
        photoURL: user ? user.photoURL : null,
        country: user ? user.country : null,
      },
      professional: {
        about: user ? user.about : null,
        roleId: user ? user.roleId : null,
        role: user ? this.getFormRole(user) : null
      }
    }
  }

  private getFormRole(user: User): EmployeeForm | RecruiterForm | null {
    if (user.roleId === 'employee') {
      const role = user.role as Employee;

      const formRole: EmployeeForm = {
        expectedSalary: role.expectedSalary,
        specialization: role.specialization ? role.specialization.id : null,
        qualification: role.qualification ? role.qualification.id : null,
        skills: role.skills.map((x: any) => x.id),
        experiences: role.experiences
      }

      return formRole;
    }

    if (user.roleId === 'recruiter') {
      const role = user.role as Recruiter;

      const formRole: RecruiterForm = {
        companyName: role.companyName,
        employeesCount: role.employeesCount,
        experiences: []
      }

      return formRole;
    }

    return null;
  }

  formToUserCreate(form: ProfileForm | any, dictionaries: Dictionaries): UserCreateRequest {
    return {
      name: form.personal?.name || null,
      photoURL: form.personal?.photoURL || null,
      roleId: form.professional?.roleId,
      country: form.personal?.country || null,
      about: form.professional?.about,
      role: this.getRole(form, dictionaries)
    }
  }

  private getRole(form: ProfileForm, dictionaries: Dictionaries): Employee | Recruiter | null {
    if (form && form.professional?.roleId === 'employee') {
      const formRole = form.professional.role as EmployeeForm;

      const role: Employee = {
        expectedSalary: formRole.expectedSalary,
        specialization: dictionaries.specializations.items.find(x => x.id === formRole.specialization) || null,
        qualification: dictionaries.qualifications.items.find(x => x.id === formRole.qualification)  || null,
        skills: formRole.skills.map(id => dictionaries.skills.items.find(x => x.id === id)),
        experiences: form.professional.role?.experience
      }

      return role;
    }

    if (form && form.professional?.roleId === 'recruiter') {
      const formRole = form.professional.role as RecruiterForm;

      const role: Recruiter = {
        companyName: formRole.companyName,
        employeesCount: formRole.employeesCount,
      }

      return role;
    }

    return null;
  }

  formToUserUpdate(form: ProfileForm, user: User, dictionaries: Dictionaries): User {
    return {
      uid: user.uid,
      email: user.email,
      created: user.created,
      name: form.personal?.name || null,
      photoURL: form.personal?.photoURL || null,
      roleId: form.professional?.roleId,
      country: form.personal?.country || null,
      about: form.professional?.about,
      role: this.getRole(form, dictionaries)
    };
  }

}
