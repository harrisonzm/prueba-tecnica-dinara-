import * as Joi from 'joi';
import * as dotenv from 'dotenv';

// Cargar variables del archivo .env si no están en process.env
dotenv.config();

interface EnvVars {
  PORT: number;
  HOST: string;
  DATABASE_URL: string;
}

// Definir el esquema de validación
const envsSchema = Joi.object<EnvVars>({
  PORT: Joi.number().default(3001), // Valor por defecto si no está en .env ni en process.env
  DATABASE_URL: Joi.string().required(),
  HOST: Joi.string().required(),
}).unknown(true); // Permite variables adicionales en `process.env`

// Validar las variables de entorno
const validationResult = envsSchema.validate(process.env);

if (validationResult.error) {
  throw new Error(`Config validation error: ${validationResult.error.message}`);
}

// Extraer los valores validados
const envVars: EnvVars = validationResult.value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  host: envVars.HOST,
};
