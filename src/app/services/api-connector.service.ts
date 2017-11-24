import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface CompanyObject {
  name: string;
  fiscal: string;
  created_at: Date;
  updated_at: Date;
}

@Injectable()
export class ApiConnectorService {

  constructor(private http: HttpClient) { }

  domain = 'http://localhost:8000';
  apiBase = '/api';
  apiVersion = '/v1';

  getUrl = function (uri, success, error){
    this.http.get(this.buildUrl(uri)).subscribe
      (data => {
          success(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          error('Client-side error occured.');
        } else {
          error('Server-side error occured.');
        }
      });
  };

  getParameterizedUrl = function (uri, datos, success, error) {
    this.http.get(this.buildUrl(uri), {
      search: datos
    }).subscribe
      (data => {
        success(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          error('Client-side error occured.');
        } else {
          error('Server-side error occured.');
        }
      });
  };

  postUrl = function (uri, datos, success, error){
    this.http.post(this.buildUrl(uri), datos).subscribe
      (data => {
        success(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          error('Client-side error occured.');
        } else {
          // error('Server-side error occured.');
          error(err);
        }
      });
  };

  private buildUrl(uri) {
    let url = '';
    if (uri === '/oauth/token' || uri === '/oauth/token/refresh') {
      console.log('Token access');
      url = this.domain + uri;
    } else {
      console.log('Other gets');
      url = this.domain + this.apiBase + this.apiVersion + uri;
    }

    return url;
  }

}
