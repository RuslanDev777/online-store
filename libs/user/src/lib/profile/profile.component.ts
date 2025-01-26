import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@arslan-workspace/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);

  profileForm!: FormGroup;

  user = toSignal(this.userService.getUser());

  get addresses() {
    return this.profileForm.get('address') as FormArray;
  }

  fullName = computed(
    () => this.user()?.name.firstname + '' + this.user()?.name.lastname
  );

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: new FormControl({ value: '', disabled: true }, Validators.required),
      email: ['', Validators.required],
      phone: '',
      name: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
      }),
      address: this.fb.group({
        city: ['', Validators.required],
        street: '',
        number: '',
        zipcode: '',
        geolocation: this.fb.group({
          lat: ['', Validators.required],
          long: ['', Validators.required],
        }),
      }),

      // address: this.fb.array([
      //   this.fb.group({
      //     city: ['', Validators.required],
      //     street: '',
      //     number: '',
      //     zipcode: '',
      //     geolocation: this.fb.group({
      //       lat: ['', Validators.required],
      //       long: ['', Validators.required],
      //     }),
      //   }),
      // ]),

      // address: this.fb.array([this.prepareAddressForm()]),
    });

    this.loadProfile();
  }

  prepareAddressForm() {
    return this.fb.group({
      city: ['', Validators.required],
      street: '',
      number: '',
      zipcode: '',
      geolocation: this.fb.group({
        lat: ['', Validators.required],
        long: ['', Validators.required],
      }),
    });
  }

  addControl() {
    this.addresses.push(this.prepareAddressForm());
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  resetAddress() {
    this.addresses.clear();
  }

  loadProfile() {
    this.userService.getUser().subscribe((user) => {
      this.profileForm.patchValue(user);
    });
  }

  updateProfile() {
    this.userService
      .updateUser(this.profileForm.getRawValue())
      .subscribe((user) => {
        console.log(user);
      });
  }

  toggleEdit() {
    this.profileForm.enabled
      ? this.profileForm.disable()
      : this.profileForm.enable();
  }
}
