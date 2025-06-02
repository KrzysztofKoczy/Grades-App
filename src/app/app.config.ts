import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MockApiInterceptor } from './interceptors/mock-api-interceptor';

const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const interceptor = inject(MockApiInterceptor)
  return interceptor.intercept(req, { handle: next })
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    MockApiInterceptor, // Provide the interceptor as a service
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
