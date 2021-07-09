import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { loginResponse } from "../shared/models/fighter.model";

@Injectable({ providedIn: 'root' })

export class requestService {
    loginReq(email: string, password: string, returnSecureToken = true) {
        return this.http.post<loginResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHoqTAcgSwOhAXHIR38SRXvgBziKDYCV8', {
            email: email,
            password: password,
            returnSecureToken: true
        }
        )
    }

    signupReq(email: string, password: string, returnSecureToken = true) {
        return this.http.post<loginResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHoqTAcgSwOhAXHIR38SRXvgBziKDYCV8', {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }

    constructor(private http: HttpClient) { }
}