import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { CategoryEffects, categoryFeature } from '@arslan-workspace/category';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loadUserProfile, userFeature } from '@arslan-workspace/store';
import { cartFeature } from '@arslan-workspace/cart';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding()
    ),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore(),
    provideState(categoryFeature),
    provideState(userFeature),
    provideState(cartFeature),
    provideEffects([CategoryEffects, { loadUserProfile }]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
