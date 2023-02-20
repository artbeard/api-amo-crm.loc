import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ApiService {
	constructor(
		private readonly httpService: HttpService
	) {}

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

	private entityTypes = {
		deal: 'leads',
		contact: 'contacts',
		company: 'companies'
	}

	createCompany(companyName: string, host: string, token: string): Promise<any>
	{
		return this.createEntity('company', companyName, host, token);
	}

	private createEntity(entityType:string, entityName: string, host: string, token: string): Promise<any>
	{
		return this.httpService.axiosRef.post(`https://${host}/api/v4/${this.entityTypes[entityType as 'company' | 'contact' | 'deal' ]}`,
			[{
				name: entityName,
				request_id: entityName + 'create' //
			}],
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
				if (err.response.status === 401)
				{
					throw new HttpException('Вы неавторизованы', HttpStatus.UNAUTHORIZED);
				}
				else if (err.response.status === 400)
				{
					throw new HttpException(err.response?.data?.detail ?? 'Ошибка валидации', HttpStatus.BAD_REQUEST);
				}
				else
				{
					throw new HttpException('Ошибка выполнения запроса', err.response.status);
				}
			})
	}

}
