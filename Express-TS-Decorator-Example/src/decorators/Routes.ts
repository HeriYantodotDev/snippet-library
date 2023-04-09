import 'reflect-metadata';

import { Method } from './constant/Method';
import { MetadataKeys } from './constant/MetadataKeys';


function routerBinder(method: string): Function {
  return function (path: string): Function {
    return function(target: any, key: string, desc: PropertyDescriptor): void {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
};

export const get = routerBinder(Method.get);
export const post = routerBinder(Method.post);
export const put = routerBinder(Method.put);
export const del = routerBinder(Method.del);
export const patch = routerBinder(Method.patch);