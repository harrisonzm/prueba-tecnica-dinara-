import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const handleRpcError = (
  error: unknown,
  defaultMessage: string,
): HttpException | InternalServerErrorException => {
  // Caso 1: Si el error es una RpcException con objeto de error
  if (error instanceof RpcException) {
    const errorResponse = error.getError();
    if (typeof errorResponse === 'object' && errorResponse !== null) {
      const { message, statusCode } = errorResponse as {
        message?: string;
        statusCode?: number;
      };
      throw new HttpException(message || defaultMessage, statusCode || 500);
    }
    throw new HttpException(defaultMessage, 500);
  }

  // Caso 2: Si el error ya tiene `response` con `status` (Ej: error de microservicio)
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as any).response === 'string' &&
    'status' in error
  ) {
    const err = error as { response: string; status: number };
    throw new HttpException(err.response, err.status);
  }

  // Caso 3: Si el error ya tiene `statusCode` y `message` (Ej: error HTTP normal)
  if (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'message' in error
  ) {
    const err = error as { message: string; statusCode: number };
    throw new HttpException(err.message, err.statusCode);
  }

  // Caso 4: Si el error es un string (por si acaso)
  if (typeof error === 'string') {
    throw new HttpException(error, 500);
  }

  // Caso 5: Si no es un error reconocible, lanzar una excepción interna
  throw new InternalServerErrorException(defaultMessage);
};
