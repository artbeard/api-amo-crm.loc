import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { EntityType, ICreatedCompanyResult, ICreatedContactResult, ICreatedDealResult } from "../type";

@Injectable()
export class ApiService {
	constructor(
		private readonly httpService: HttpService
	) {}

	/**
	 * Создание Компании
	 * @param companyName
	 * @param host
	 * @param token
	 */
	createCompany(companyName: string, host: string, token: string): Promise<ICreatedCompanyResult>
	{
		return this.createEntity(EntityType.company, companyName, host, token);
	}

	/**
	 * Создание контакта
	 * @param contactName
	 * @param host
	 * @param token
	 */
	createContact(contactName: string, host: string, token: string): Promise<ICreatedContactResult>
	{
		return this.createEntity(EntityType.contact, contactName, host, token);
	}

	/**
	 * Создание сделки
	 * @param dealName
	 * @param host
	 * @param token
	 */
	createDeal(dealName: string, host: string, token: string): Promise<ICreatedDealResult>
	{
		return this.createEntity(EntityType.deal, dealName, host, token);
	}

	/**
	 * Выполнение запроса к API для создания сущности
	 * @param entityType
	 * @param entityName
	 * @param host
	 * @param token
	 * @private
	 */
	private createEntity(entityType:string, entityName: string, host: string, token: string): Promise<any>
	{
		return this.httpService.axiosRef.post(
			`https://${host}/api/v4/${entityType}`,
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
				if (err.response?.status === 401)
				{
					throw new HttpException('Вы неавторизованы', HttpStatus.UNAUTHORIZED);
				}
				else if (err.response?.status === 400)
				{
					throw new HttpException(
						err.response?.data?.detail ?? 'Ошибка валидации',
						HttpStatus.BAD_REQUEST
					);
				}
				else
				{
					throw new HttpException(
						'Ошибка выполнения запроса',
						err?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
					);
				}
			})
	}

}
