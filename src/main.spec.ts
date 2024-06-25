import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

describe('Main', () => {
  it('should bootstrap the application', async () => {
    const mockApp = {
      listen: jest.fn().mockResolvedValue(true),
    };

    jest.spyOn(NestFactory, 'create').mockResolvedValue(mockApp as any);
    jest.spyOn(NestFactory, 'createMicroservice').mockResolvedValue(mockApp as any);

    await import('./main');
    expect(mockApp.listen).toHaveBeenCalled();
  });
});
