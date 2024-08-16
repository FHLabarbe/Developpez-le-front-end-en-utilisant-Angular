import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';

// Interface pour les données du graphique ngx charts
interface MedalData {
  name: string; // Nom du pays
  value: number; // Nombre total de médailles
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = new Observable();
  public isLoading: boolean = true;
  public subscribeTest!: Subscription;

  constructor(private olympicService: OlympicService) {}
  ngOnDestroy(): void {
    this.subscribeTest.unsubscribe();
  }

  ngOnInit(): void {
    this.loadMedalData();
  }

  loadMedalData() {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscribeTest = this.olympics$.subscribe(data => {
      this.isLoading = false;
    });
  }
  
}
