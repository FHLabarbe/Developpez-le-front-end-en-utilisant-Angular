import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

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
  public medalData: MedalData[] = [];
  public numberOfJos!: number;
  public numberOfCountries!: number;
  public graphGrid: [number, number]= [800,400];
  public showLegend: boolean = true;
  public legendTitle: string = 'Medals per Country';
  public isLoading: boolean = true;
  public subscribtion!: Subscription;


  constructor(private olympicService: OlympicService, private router: Router) {}
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  ngOnInit(): void {
    this.loadMedalData();

  }

  public scheme: string = 'cool';

  onHover(event: any): void {
    /* TODO
    se servir de getParticipationCountForCountry afin de remplir l'encart Number of JOs
    */
  }

  onSelect(event: any): void {
    const countryName = event.name;
    this.router.navigate(['/detail',countryName]);
  }

  loadMedalData() {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscribtion = this.olympics$.subscribe(data => {
      this.medalData = this.transformData(data);
      this.isLoading = false;
    });
  }

  public getParticipationCountForCountry(countryName: string): number {
    this.olympics$.subscribe(data => {
      const selectedCountry = data.find(country => country.country === countryName);
      if (selectedCountry) {
        const participationCount = selectedCountry.participations.length;
        return participationCount;
      }
      else{
        return 0;
      }
    });
    return 0;
  }
  
  
  

  transformData(data: Olympic[]): MedalData[]{
    this.numberOfCountries = data.length;
    return data.reduce((acc, country) => {
      const countryName = country.country;
      const totalMedals = country.participations.reduce((sum, p)=> sum + p.medalsCount, 0);
      acc.push({name: countryName, value: totalMedals});
      return acc;
    }, [] as MedalData[]);
  }
  
}
