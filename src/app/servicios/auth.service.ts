import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  public SignIn(email: string, pass: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }

  public GetUser() {
    return this.afAuth.auth.currentUser.email;
  }

  public LogOut() {
    return this.afAuth.auth.signOut()
  }
}
