
export class Path {
public API_PATH: string;
public API_IMAGE_PATH: string;
public LIST_MESSAGE: string;

public adminLoginStatus: boolean;

    constructor() {
        this.API_PATH           =   'http://192.168.3.36:8085/api/';
        this.API_IMAGE_PATH     =   'http://192.168.3.36:8085/uploads/';

        this.adminLoginStatus   =   false; 
    }
}
