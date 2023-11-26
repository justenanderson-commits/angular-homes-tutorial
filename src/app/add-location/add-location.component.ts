import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { HousingLocation } from '../housing-location'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { HousingService } from '../housing.service'
import { HttpClientModule } from '@angular/common/http'

// This component will take input from the user to add a new housing location, which will require:
// Functions that will update the housing location array with the newly input data
// A confirmation message and/or a redirect to the details page on the newly added location

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="add-location-page">
      <a href="/">⬅ Back to Home Page</a>
      <section class="form-section">
        <form [formGroup]="addLocationForm" (submit)="addHousingLocation()">
          <h1 class="section-heading">Add a new housing location</h1>
  
          <label for="name">Location Name</label>
          <input id="name" type="text" formControlName="name" required/>

          <label for="city">City</label>
          <input id="city" type="text" formControlName="city" required/>

          <label for="state">State</label>
          <input id="state" type="text" formControlName="state"  required/>

          <label for="photo">Image URL</label>
          <input id="photo" type="text" formControlName="photo"  required/>

          <label for="availableUnits">Number of units available</label>
          <input id="availableUnits" type="text" formControlName="availableUnits" required/>

          <p class="section-heading">Has wifi?</p>
          <div class="radio-buttons">
            <label for="wifi">Yes</label>
            <input id="wifi" name="wifi" type="radio" value="true" formControlName="wifi"  required/>
          </div>
          <div class="radio-buttons">
            <label class="no-labels" for="wifi">No</label>
            <input id="wifi" name="wifi" type="radio" value="false" formControlName="wifi" required/>
          </div>

          <p class="section-heading">Has on-site laundry?</p>
          <div class="radio-buttons">
            <label for="laundry">Yes</label>
            <input id="laundry" name="laundry" type="radio" value="true" formControlName="laundry" required/>
          </div>
          <div class="radio-buttons">
            <label class="no-labels" for="laundry">No</label>
            <input id="laundry" name="laundry" type="radio" value="false" formControlName="laundry" required/>
          </div>

          <button class="add-location-button" type="submit" class="primary">
            Add location
          </button>
        </form>
      </section>
    </div>
  `,
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationComponent {
  housingService: HousingService = inject(HousingService)
  housingLocation: HousingLocation | undefined
  addLocationForm = new FormGroup({
    id: new FormControl(Date.now()),
    name: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    photo: new FormControl(''),
    availableUnits: new FormControl(1),
    wifi: new FormControl(false),
    laundry: new FormControl(false),
  })

  // constructor() {
  //   this.housingService
  //     .addHousingLocation
  // }

  addHousingLocation = () => {
    this.housingService.addHousingLocation(
      this.addLocationForm.value.id ?? 0,
      this.addLocationForm.value.name ?? '',
      this.addLocationForm.value.city ?? '',
      this.addLocationForm.value.state ?? '',
      this.addLocationForm.value.photo ?? '',
      this.addLocationForm.value.availableUnits ?? 0,
      this.addLocationForm.value.wifi ?? false,
      this.addLocationForm.value.laundry ?? false,
    )
  }
}
