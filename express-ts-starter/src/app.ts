import express from 'express';
import { AppRouter } from './config';
import './controllers/index';

export const app = express();

class StartUpMiddleware {
  static configMiddleware(): void {
    this.configBodyParser();
  }

  private static configBodyParser(): void {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    // CheckingJSONRequest
  }

}

class Routers {
  static setUpAllRouters(): void {
    this.configRouters();
  }

  private static configRouters(): void {
    app.use(AppRouter.router);
  }
}

// class Errors {

// }

StartUpMiddleware.configMiddleware();
Routers.setUpAllRouters();
// eslint-disable-next-line no-console
console.log(`Environment : ${process.env.NODE_ENV}`);