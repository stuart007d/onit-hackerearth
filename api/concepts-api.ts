import express, { Request, Response, NextFunction } from 'express';

export const conceptsApi = (request: Request, response: Response) => {
    response.status(200).json({'hello':'world'});
}