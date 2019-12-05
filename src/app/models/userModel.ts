import { Injectable } from '@angular/core';

@Injectable()
export class UserModel {

    public  name:string                         =   '';
    public  firstName:string                    =   '';
    public  lastName:string                     =   '';
    public  email:string                        =   '';
    public  password:string                     =   '';
    public  cognitoUserName:string              =   '';
    public  speciality:string                   =   '';
    public  bio:string                          =   '';
}