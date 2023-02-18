import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ApiService {
	constructor(
		private readonly httpService: HttpService
	) {}

	//return this.httpService.axiosRef.get('http://.../api/v4/..');

}
