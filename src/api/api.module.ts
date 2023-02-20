import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { HttpModule, HttpService } from "@nestjs/axios";
import { AuthService } from "../auth/auth.service";

@Module({
	controllers: [ApiController],
	providers: [
	//	HttpService,
		ApiService,
		//AuthService,
	],
	imports: [
		HttpModule
	],
})
export class ApiModule {}
