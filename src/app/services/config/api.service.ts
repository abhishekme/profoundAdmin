import { Injectable } from '@angular/core';
import {environment } from '../../../environments/environment';
import { HttpClient, HttpHandler, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { UserModel } from "../../models/userModel";
//import'rxjs/add/operator/map';
// import {
//     HttpInterceptor,
//     HttpRequest,
//     HttpEvent,
// } from '@angular/common/http';


@Injectable()
export class ApiService {

    private headers: any;
    private options: any;

    constructor(private http: HttpClient){
        this.headers = new Headers({ 'Access-Control-Allow-Origin' : '*'});
        this.options = new RequestOptions({ headers: this.headers });
    }
    //General declaration
    private API_BASE_URL:string     =  environment.SERVER_BASE_URL + '/api/admin/';


    /*******************
    *
    *   Get User Token
    * 
    ********************/
    getLoginToken(){
        let savedToken  =   sessionStorage.getItem('loginToken');
        if(savedToken != null){
            return savedToken;
        }
    }
    clearLoginToken(){
        sessionStorage.setItem('loginToken', '');
        return true;
    }
    setLoginToken(authToken: any, userData: any){
        let currentUserData: any = '';
        currentUserData         =   window.btoa((authToken) + '|' + window.btoa(userData.id));
        //currentUserData['authToken']    = (authToken);
        //currentUserData['userId']       = (userData.id);
        sessionStorage.setItem('loginToken', (currentUserData));        
    }

    getHeaders(){
        let headers = new HttpHeaders({ 'Access-Control-Allow-Origin' : '*','Content-Type' : 'application/x-www-form-urlencoded'});
    return headers;
    }

    getHeadersOptions(){
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin' : '*' 
        });
        let options = { headers: headers };
    return options;
    }

    getHeadersAuthOptions(){
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin' : '*' 
        });
        let options = { headers: headers };
    return options;
    }

    /*****************************************************
    *
    * Get Dashboard Count
    * @param:   
    * token:    Login Auth
    * 
    *******************************************************/
    getDashboardCount(type: string): Observable<any>{
        let apiURL          = this.API_BASE_URL + 'total-dashboard-count?type='+type;        
        let getTokenData    = (window.atob(this.getLoginToken())).toString().split('|');
            //console.log('Get token: ', getTokenData);
        let userId          = window.atob(getTokenData[1]);
        let headers         = new HttpHeaders({"authorization" : getTokenData[0], "userid": userId, 'Access-Control-Allow-Origin': '*','Content-Type':'application/json'});
            //console.log('Send headers: ', headers.get('authorization'),  " :: ", headers.get('userid'));
        return this.http.get(apiURL, {headers}).pipe(
            (data => data),
            catchError(this.handleError)
        );
    }
    /*****************************************************
    *
    * Get User Record
    * @param:   
    * token:    Login Auth
    * 
    *******************************************************/
   public getUser():Observable<any>{
       console.log('user....');
    let apiURL          = this.API_BASE_URL + 'get-user-list';        
    let getTokenData    = (window.atob(this.getLoginToken())).toString().split('|');
    let userId          = window.atob(getTokenData[1]);
    let headers         = new HttpHeaders({"authorization" : getTokenData[0], "userid": userId, 'Access-Control-Allow-Origin': '*','Content-Type':'application/json'});
    return this.http.get(apiURL, {headers}).pipe(
        (data => data),
        catchError(this.handleError)
    );
}
    /************************************************************
    *
    * Admin Login
    * @param: 
    * email :   admin user valid email
    * password: valid user password
    * 
    **************************************************************/
    createLogin(postBody: any): Observable<any>{
        let loginURL    =   this.API_BASE_URL + 'admin-login'; 
        let body = {};
        body['email'] = postBody.email;
        body['password'] = postBody.password;
        console.log('URL: ', loginURL, " :: ", postBody, " :: ", body);

        let headers = new HttpHeaders({'Content-Type':'application/json'});
        //headers.append('Content-Type','application/json');
        return this.http.post(loginURL,postBody, {headers}).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    //: Observable<any>
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        // if (err.error instanceof ErrorEvent) { 
        //     errorMessage = `An error occurred: ${err.error.message}`;
        // } else { 
        //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        // }
        // console.log('Error Found: ',errorMessage );        
        // console.error(errorMessage);
        return throwError(err.error);
    }
}