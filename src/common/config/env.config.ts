import { IsEnum, IsNumber, Matches, Max, Min, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export enum Environment {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
	TEST = 'test',
}

export class EnvironmentVariables {
	@IsEnum(Environment)
	NODE_ENV: Environment;

	@IsNumber()
	@Min(0)
	@Max(65535)
	PORT: number;

	@Matches(
		/mongodb?([\+srv]*):\/\/(?:(?<login>[^\:\/\?\#\[\]\@]+)(?::(?<password>[^\:\/\?\#\[\]\@]+))?@)?(?<host>[\w\.\-]+(?::\d+)?(?:,[\w\.\-]+(?::\d+)?)*)(?:\/(?<dbname>[\w\.\-]+))?(?:\?(?<query>[\w\.\-]+=[\w\.\-]+(?:&[\w\.\-]+=[\w.\-]+)*))?/,
	)
	DATABASE_URI: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToClass(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}
