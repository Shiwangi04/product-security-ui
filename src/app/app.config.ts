import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './_auth/auth.interceptor';

export const appConfig: ApplicationConfig = {providers: [
  provideHttpClient(withInterceptors([authInterceptor])), provideClientHydration(), provideRouter(routes)
]};
