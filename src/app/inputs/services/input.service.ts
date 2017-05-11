import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import tsConstants = require('./../../tsconstant');

@Injectable()
export class InputService {

    private _host           = tsConstants.HOST;
    private _accessToken    = '';
  
    constructor(private _http: Http, private _cookieService: CookieService) { }

    /*Use to fetch all Inputs*/
  	getAllInputs(rowsOnPage, activePage, search = '') {

  		let headers         = new Headers();        
        this._accessToken   = this.getAccessToken();
        
        let url = this._host +'/inputs?count='+rowsOnPage+'&page='+activePage+'&search='+search;

        headers.append('Authorization', this._accessToken);
        return this._http.get(url, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to add new Input*/
    add(input) {

        let headers         = new Headers();        
        this._accessToken   = this.getAccessToken();
        
        headers.append('Authorization', this._accessToken);
        return this._http.post(this._host +'/inputs', input, { headers: headers }).map((res:Response) => res.json())
    }
    
    /*Use to get input with input id*/
    get(inputID) {

        let headers         = new Headers();
        this._accessToken   = this.getAccessToken();
        
        headers.append('Authorization', this._accessToken);
        return this._http.get(this._host +'/inputs/'+ inputID, { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to update input*/
    update(input) {
        
        let headers         = new Headers();
        this._accessToken   = this.getAccessToken();
        
        headers.append('Authorization', this._accessToken);
        return this._http.put(this._host +'/inputs/'+ input.id, input, { headers: headers }).map((res:Response) => res.json())
    }


    /*Use to Delete input with input id */
    delete( inputId ) {
        
        let headers         = new Headers();
        this._accessToken   = this.getAccessToken();
        
        headers.append('Authorization', this._accessToken );
        return this._http.delete(this._host +'/inputs/'+ inputId,  { headers: headers }).map((res:Response) => res.json());
    }   

    /*Use to fetch all Users*/
    getAllUsers() {
        let headers         = new Headers();
        this._accessToken   = this.getAccessToken();
        
        headers.append('Authorization', this._accessToken );
        return this._http.get(this._host +'/user', { headers: headers }).map((res:Response) => res.json());
    }

    /*Use to fetch all Manufactures*/
      getAllManufactures() {
          
        let headers = new Headers();        
        this._accessToken   = this.getAccessToken();
        
        headers.append('Authorization', this._accessToken);
        return this._http.get(this._host +'/manufacturer', { headers: headers }).map((res:Response) => res.json())
    }

    /*Use to fetch all categories*/
    getAllCategories() {
          
        let headers         = new Headers();
        this._accessToken   = this.getAccessToken();

        headers.append('Authorization', this._accessToken );
        return this._http.get(this._host +'/category', { headers: headers }).map((res:Response) => res.json());
    }

    getAccessToken(): string {
        let token           = this._cookieService.get('token');
        return 'Bearer ' + token;
    }
}
