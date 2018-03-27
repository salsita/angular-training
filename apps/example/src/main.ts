import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// tslint:disable-next-line nx-enforce-module-boundaries
import { hmrBootstrap } from '../../../hmr';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  const platform = platformBrowserDynamic().bootstrapModule(AppModule);

  platform.catch(err => console.log(err));

  return platform;
};

if (environment.hmr) {
  if ((module as any)['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap();
}
