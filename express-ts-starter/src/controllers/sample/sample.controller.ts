/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
import { routerConfig, get } from '../../decorators';
import { SampleHelperController } from './sample.helper.controller';

@routerConfig('/helloworld')
class SampleController {
  @get('/', SampleHelperController.httpGetSample)
  sampleGet(): void {}
}


