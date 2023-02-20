import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AuthService {
	constructor(private readonly httpService: HttpService) {}

	getAuthParams(apiKey: string): Promise<any>
	{
		return this.httpService.axiosRef.get('https://test.gnzs.ru/oauth/get-token.php', {
			headers: {
				'Content-Type': 'application/json',
				'X-Client-Id': apiKey
			}
		})
			.then(res => {
				return res.data
			})
			.catch(err => {
				throw new HttpException('Ошибка получения access_token', HttpStatus.UNAUTHORIZED);
			})

	}
}
