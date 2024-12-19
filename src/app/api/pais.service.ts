import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public insert(formData: FormData): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/pais/insert`, formData);
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/pais/getAll`);
  }
  public getByName(name: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/pais/search/${name}`);
  }
  public delete(idPais: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:8080/pais/delete/${idPais}`);
  }
}
