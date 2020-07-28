import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/modules/users/services/data.service';
import { IRole } from 'src/app/interfaces/role.interface';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent implements OnInit {
  userForm: FormGroup;
  roles = [];
  private patternEmail = '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  private patternOnlyCharacters = '^[a-zA-Z]+$';
  constructor(
    public dialogRef: MatDialogRef<ModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: IUser, roles: IRole[]},
  ) {}

  ngOnInit(): void {
    this.buildForm(this.data.user);
    this.roles = this.data.roles;
  }

  buildForm(data?: IUser) {
    this.userForm = new FormGroup({
      firstName: new FormControl(data ? data.firstName : null, [Validators.required, Validators.pattern(this.patternOnlyCharacters)]),
      lastName: new FormControl(data ? data.lastName : null, [Validators.required, Validators.pattern(this.patternOnlyCharacters)]),
      email: new FormControl(data ? data.email : null, [
        Validators.required,
        Validators.pattern(this.patternEmail),
      ]),
      role: new FormControl(data ? (data.role as IRole)._id : null, Validators.required),
    });
    this.userForm.markAllAsTouched();
  }

  getErrorMessage(controlName: string) {
    if (this.userForm.get(controlName).hasError('required')) {
      return 'You must enter a value';
    }

    if (controlName === 'email') {
      return this.userForm.get(controlName).hasError('pattern')
      ? 'Not a valid email'
      : '';
    }

    return this.userForm.get(controlName).hasError('pattern')
    ? 'Field can not contains numbers or symbols'
    : '';
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.data.user ? { id: this.data.user._id, data: this.userForm.value } : this.userForm.value);
  }
}
