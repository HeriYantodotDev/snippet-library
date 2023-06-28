import { Request, Response } from 'express';

export class SampleHelperController {
  public static async httpGetSample(
    req: Request,
    res: Response
  ): Promise<void> {
    res.send({item: 'Hello World'});
  }
}