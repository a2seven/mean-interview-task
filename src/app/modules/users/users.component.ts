import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalUserComponent } from '../shared/components/modal-user/modal-user.component';
import { IUser } from 'src/app/interfaces/user.interface';
import { DataService } from './services/data.service';
import { ToastrService } from 'ngx-toastr';
import { IRole } from 'src/app/interfaces/role.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'role',
    'actions',
  ];

  dataSource: IUser[] = [];

  roles: IRole[] = [];

  filterForm = new FormGroup({
    roleControl: new FormControl(null),
    searchControl: new FormControl(null),
  });

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadRoles();
    this.filterForm.valueChanges.subscribe((v) => {
      this.loadData(v);
    });
  }

  loadData(filters = {}) {
    this.dataService
      .getUsers(filters)
      .subscribe((res: IUser[]) => {
        this.dataSource = res;
      });
  }

  loadRoles() {
    this.dataService.getRoles().subscribe((res: IRole[]) => {
      this.roles = res;
    });
  }

  delete(user: IUser) {
    this.dataService.deleteUser(user._id).subscribe((res) => {
      this.loadData(this.filterForm.value);
      this.toastr.success('User has been removed');
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(ModalUserComponent, {
      width: '400px',
      data: { user: null, roles: this.roles },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.createUser(result).subscribe((res) => {
          this.toastr.success('User successfuly added');
          this.loadData(this.filterForm.value);
        });
      }
      console.log('The dialog was closed');
    });
  }

  openDialogUpdate(user: IUser): void {
    const dialogRef = this.dialog.open(ModalUserComponent, {
      width: '400px',
      data: { user, roles: this.roles },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateUser(result.data, result.id).subscribe((res) => {
          this.loadData(this.filterForm.value);
          this.toastr.success('User has been updated');
        });
      }
      console.log('The dialog was closed');
    });
  }
}
