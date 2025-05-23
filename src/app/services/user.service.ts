import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../intefaces/models/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  USER: string = 'user';

  constructor(private router: Router) { }

  addUser(userData: {name: string, email: string, password: string}) {
    const user: User = {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(this.USER) || '{}') as User;
  }

  deleteUserAccount() {
    localStorage.clear();
    this.router.navigateByUrl('create-account');
  }

  isLoggedin() {
    return Object.keys(this.getUser()).length > 0;
  }
}
