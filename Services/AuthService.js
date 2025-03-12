// src/services/authService.js
import {environment} from '../environments/environment'

class AuthService {
  constructor(http) {
    this.http = http;
  }

  apiRoot = environment.API_ROOT;

}

export default new AuthService();
