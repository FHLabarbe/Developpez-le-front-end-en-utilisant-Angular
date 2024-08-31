import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LinearGraphValues, Olympic, MedalData } from 'src/app/core/models';

@Component({
  selector: 'app-details-per-country',
  templateUrl: './details-per-country.component.html',
  styleUrl: './details-per-country.component.scss'
})
export class DetailsPerCountryComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = new Observable();
  public countryName: string | null = null;
  public countryDetails: Olympic | null = null;
  public medalData!: LinearGraphValues[];
  public graphGrid: [number, number]= [800,400];
  public subscribtion!: Subscription;
  public totalParticipations!: number;
  public totalMedals!: number;
  public totalAthletes!: number;



  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router){}
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.countryName = params.get('countryName');
      this.loadCountryDetails(this.countryName);
    });
  }

  loadCountryDetails(countryName: string | null): void {
    if (countryName) {
      this.olympics$ = this.olympicService.getOlympics();
      this.subscribtion = this.olympics$.subscribe(data => {
        this.countryDetails = data.find(country => country.country === countryName) || null;
        if (this.countryDetails) {
          this.medalData = [{name: "medaille",series:this.transformData(this.countryDetails)}] ;
          this.calculateTotals(this.countryDetails);
        } else {
          this.router.navigate(['/not-found']);
        }
      });
    } else {
      this.router.navigate(['/not-found']);
    }
  }

  transformData(countryDetails: Olympic): MedalData[]{
    return countryDetails.participations.map(participation => ({
      name : participation.year.toString(),
      value: participation.medalsCount
    }));
  }

  onResize(event: any): void{
    let width = window.innerWidth;
    if (width > 1200) {
      width = width / 1.5;
    } else if (width > 800) {
      width = width / 1.3;
    } else {
      width = width / 1.1;
    }
    const height = width / 2;
    this.graphGrid = [width, height];
  }
  
  calculateTotals(countryDetails: Olympic): void {
    this.totalParticipations = countryDetails.participations.length;
    
    this.totalMedals = countryDetails.participations.reduce((total, participation) => {
      return total + participation.medalsCount;
    }, 0);
    
    this.totalAthletes = countryDetails.participations.reduce((total, participation) => {
      return total + participation.athleteCount;
    }, 0);
  } 

  goBack():void{
    this.router.navigate(['']);
  }
}
