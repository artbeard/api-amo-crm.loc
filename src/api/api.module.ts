import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "../auth/auth.module";

@Module({
	controllers: [ApiController],
	providers: [
		ApiService,
	],
	imports: [
		HttpModule,
		AuthModule
	],
})
export class ApiModule {}
