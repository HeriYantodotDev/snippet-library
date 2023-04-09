import 'reflect-metadata';
import { AppRouter } from '../AppRouter';
import { Method, MetadataKeys } from './constant';
import { bodyValidatorCheck } from '../utils/bodyValidatorcheck';


export function routerConfig(routePrefix: string): Function {
  return function (target: Function): void {
    const router = AppRouter.router;

    //KEY DIFFERENCE WITH ES5
    const keys = Object.getOwnPropertyNames(target.prototype);

    for (let key of keys) {
      if (key === 'constructor') {
        continue;
      };

      //KEY DIFFERENCE WITH ES5
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      const routerController = descriptor?.value;

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      const method: Method = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares = Reflect.getMetadata(
        MetadataKeys.middleware,
        target.prototype,
        key
      ) || [];

      const requiredBodyProps = Reflect.getMetadata(
        MetadataKeys.validator,
        target.prototype,
        key
      ) || [];
      
      const validator = bodyValidatorCheck(requiredBodyProps);

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routerController);
      };


    }
    

    };
  };


