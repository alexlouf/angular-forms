import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formElements = {
    firstname: [null, [Validators.required, Validators.minLength(2)]],
    nbPerson: [1, [Validators.required, Validators.min(1), Validators.max(4)]]
  };

  formGroup: FormGroup;

  constructor(
      private  fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.formGroup = this.fb.group(this.formElements);

    // Modifie des valeurs par défaut
    this.formGroup.patchValue({
      firstname: 'toto'
    });

    // remettre à zero le form
    this.formGroup.reset();

    // modifier le validators à la volée
    this.formGroup.controls.firstname.clearValidators(); // y a plus de validators
    this.formGroup.controls.firstname.setValidators([
        Validators.required
    ]);

    // Update valeurs coté front
    this.formGroup.controls.firstname.updateValueAndValidity();

    // Evenement formulaire
    this.formGroup.valueChanges.subscribe((res) => {
      console.log(res);
    });

    // Evenement champs
    this.formGroup.controls.firstname.valueChanges.subscribe((res) => {
      console.log(res);
    });
  }

  submit() {
    console.log(this.formGroup.value);
  }
}
