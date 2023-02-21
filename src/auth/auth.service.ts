import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { IAuthToken } from "../type";

@Injectable()
export class AuthService {
	constructor(private readonly httpService: HttpService) {}

	/**
	 * Получение access_token
	 * @param apiKey
	 */
	getAuthParams(apiKey: string): Promise<IAuthToken>
	{
		return this.httpService.axiosRef.get('https://test.gnzs.ru/oauth/get-token.php', {
			headers: {
				'Content-Type': 'application/json',
				'X-Client-Id': apiKey
			}
		})
			.then((res): IAuthToken => {
				return res.data
			})
			.catch(err => {
				throw new HttpException('Ошибка получения access_token', HttpStatus.UNAUTHORIZED);
			})
	}
}
