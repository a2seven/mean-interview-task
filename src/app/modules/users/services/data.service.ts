import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { Observable } from 'rxjs';
import { API } from 'src/app/const/routes';
import { IRole } from 'src/app/interfaces/role.interface';

@Injectable({providedIn: 'root'})
export class DataService {
    constructor(private requestService: RequestService) {
    }

    getUsers(params): Observable<IUser[]> {
        return this.requestService.get(API.GET_USERS, params);
    }

    getRoles(): Observable<IRole[]> {
        return this.requestService.get(API.GET_ALL_ROLES);
    }

    createUser(body) {
        return this.requestService.post(API.CREATE_USER, body);
    }

    deleteUser(id: string) {
        return this.requestService.delete(`${API.DELETE_USER}/${id}`);
    }

    updateUser(data: any, id: string) {
        return this.requestService.put(`${API.UPDATE_USER}/${id}`, data);
    }
}
