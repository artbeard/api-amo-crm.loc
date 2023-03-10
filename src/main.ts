import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as hbs from 'hbs';
import {join} from 'path';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.useStaticAssets(join(__dirname, '..', 'public')); //для отдачи статикик
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	app.setViewEngine('hbs');
	app.use(
		session({
			secret: 'klf-sa7984-350940',
			resave: false,
			saveUninitialized: false,
		}),
	);
	await app.listen(3000);
}
bootstrap();
