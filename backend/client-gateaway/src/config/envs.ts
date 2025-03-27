import * as Joi from 'joi';
import * as dotenv from 'dotenv';

// Cargar variables del archivo .env si no están en process.env
dotenv.config();

interface EnvVars {
  PORT: number;
  USERS_SERVICE_HOST: string;
  USERS_SERVICE_PORT: number;
  COURSES_SERVICE_HOST: string;
  COURSES_SERVICE_PORT: number;
  INSCRIPTIONS_SERVICE_HOST: string;
  INSCRIPTIONS_SERVICE_PORT: number;
}

// Definir el esquema de validación
const envsSchema = Joi.object<EnvVars>({
  PORT: Joi.number().default(3000),
  USERS_SERVICE_HOST: Joi.string().required(),
  USERS_SERVICE_PORT: Joi.number().required(),
  COURSES_SERVICE_HOST: Joi.string().required(),
  COURSES_SERVICE_PORT: Joi.number().required(),
  INSCRIPTIONS_SERVICE_HOST: Joi.string().required(),
  INSCRIPTIONS_SERVICE_PORT: Joi.number().required(),
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
  usersMsHost: envVars.USERS_SERVICE_HOST,
  usersMsPort: envVars.USERS_SERVICE_PORT,
  coursesMsHost: envVars.COURSES_SERVICE_HOST,
  coursesMsPort: envVars.COURSES_SERVICE_PORT,
  inscriptionsMsHost: envVars.INSCRIPTIONS_SERVICE_HOST,
  inscriptionsMsPort: envVars.INSCRIPTIONS_SERVICE_PORT,
};
