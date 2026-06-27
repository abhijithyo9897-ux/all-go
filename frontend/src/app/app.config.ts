import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import HttpClient
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Router and Hydration
    provideRouter(routes),
    provideClientHydration(),

    // 2. FIX: Use the stable API name (removed 'Experimental')
    provideZonelessChangeDetection(),

    // 3. FIX: Add the HttpClient provider
    provideHttpClient(withFetch())
  ]
};