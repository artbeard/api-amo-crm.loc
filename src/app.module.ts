import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";

@Module({
	controllers: [AppController],
	providers: [ AppService ],
	imports: [
		ConfigModule.forRoot({isGlobal: true,}),
		ApiModule,
		AuthModule
	],
})
export class AppModule {}
