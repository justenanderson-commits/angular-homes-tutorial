import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { HousingService } from '../housing.service'
import { HousingLocation } from '../housing-location'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
          <h2 class="section-heading">About this property</h2>
          <ul>
            <li>Units available: {{housingLocation?.availableUnits}}</li>
            <li>This property has wifi: {{housingLocation?.wifi}}</li>
            <li>This property have laundry: {{housingLocation?.laundry}}</li>
          </ul>
      </section>  
      <section class="listing-apply">
        <h2 class="section-heading">Apply to live here</h2>
      <form [formGroup]="applyForm">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">
          
          <label id="last-name">Email Address</label>
          <input id="email" type="email" formControlName="email">

          <button class="primary" type="submit">Apply now</button>
      </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService: HousingService = inject(HousingService)
  housingLocation: HousingLocation | undefined
  applyForm = new FormGroup({
    firstName: new FormControl(''), 
    lastName: new FormControl(''),
    email: new FormControl('')
  })

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id'])
    this.housingLocation =
      this.housingService.getHousingLocationById(housingLocationId)
  }
}

// Learning Notes
// Services can be used to interact with data (i.e. retrieve data from the data source)
// Property binding is done with []. Event binding is done with ().
