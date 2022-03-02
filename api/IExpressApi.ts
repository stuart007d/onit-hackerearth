import { Request, Response } from 'express';

export interface IExpressApi {
    handle(request: Request, response: Response) : Promise<void>;
}