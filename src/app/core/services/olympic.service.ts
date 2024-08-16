import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);


  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error('Error when loading Olympics data : ',error);
        this.olympics$.next([]); // ici on ne peut pas avoir un cas sans values, pour faciliter le traitement on renvoie un tableau vide lors d'erreur.
        return of([]);
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
