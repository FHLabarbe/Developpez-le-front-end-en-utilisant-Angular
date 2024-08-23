import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-per-country',
  standalone: true,
  imports: [],
  templateUrl: './details-per-country.component.html',
  styleUrl: './details-per-country.component.scss'
})
export class DetailsPerCountryComponent {
  public countryName: string | null = null;
  public countryDetails: Olympic | null = null;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.countryName = params.get('countryName');
      this.loadCountryDetails(this.countryName);
    });
  }

  loadCountryDetails(countryName: string | null){
    if (countryName) {
      this.olympicService.getOlympics().subscribe(data => {
        this.countryDetails = data.find(country => country.country === countryName) || null;
        if (!this.countryDetails) {
          this.router.navigate(['/not-found']);
        }
      });
    } else {
      this.router.navigate(['/not-found']);
    }
  }
}
