import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ApiService {
	constructor(
		private readonly httpService: HttpService
	) {}

	//return this.httpService.axiosRef.get('http://.../api/v4/..');

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

	createCompany(companyName: string, host: string, token: string): Promise<any>
	{
		return this.httpService.axiosRef.post(`https://${host}/api/v4/companies`,
			{
				name: companyName,
				request_id: companyName + 'create'
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
		})
			.then(resp => {
				return resp.data;
			})
			.catch(err => {
				//throw
				console.log(err.response.status)
				if (err.response.status === 401)
				{
					throw new HttpException('Вы неавторизованы', HttpStatus.UNAUTHORIZED);
				}
				else if (err.response.status === 400)
				{
					throw new HttpException('Ошибка', HttpStatus.UNAUTHORIZED);
				}
				else
				{
					throw new HttpException('Ошибка выполнения запроса', err.response.status);
				}
			})
	}
}
