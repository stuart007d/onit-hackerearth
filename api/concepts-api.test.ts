import { conceptsApi } from './concepts-api';
import { Request, Response } from 'express';

describe('Concepts API', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {};
        mockResponse.json = jest.fn();
        mockResponse.status = jest.fn().mockReturnValue(mockResponse);
    });

    test('should return hello world', async () => {
        conceptsApi(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith({ 'hello': 'world' });
    });
})