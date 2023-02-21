import {Controller, Body, Post, Res, Session, HttpStatus, UseGuards} from '@nestjs/common';
import { Response } from 'express';
import { ApiService } from "./api.service";
import { GetauthGuard } from "../getauth/getauth.guard";
import { ICreateEntity, ICreatedCompanyResult, ICreatedContactResult, ICreatedDealResult } from "../type";

@Controller('/api')
export class ApiController {

	constructor(private apiService: ApiService) {}

	/**
	 * Создание сущности компании
	 * @param session
	 * @param entityName
	 * @param response
	 */
	@UseGuards(GetauthGuard)
	@Post('/v4/companies')
	async create_company(
		@Session() session: Record<string, any>,
		@Body() { entityName }: ICreateEntity,
		@Res({ passthrough: true }) response: Response): Promise<void>
	{
		let createdCompany:ICreatedCompanyResult = await this.apiService.createCompany(
			entityName,
			session.base_domain,
			session.access_token
		);
		response.status(HttpStatus.OK).send({
			id: createdCompany?._embedded?.companies[0].id
		})
	}

	/**
	 * Создание сущности контакта
	 * @param session
	 * @param entityName
	 * @param response
	 */
	@UseGuards(GetauthGuard)
	@Post('/v4/contacts')
	async create_contact(
		@Session() session: Record<string, any>,
		@Body() { entityName }: ICreateEntity,
		@Res({ passthrough: true }) response: Response): Promise<void>
	{
		let createdContact:ICreatedContactResult = await this.apiService.createContact(
			entityName,
			session.base_domain,
			session.access_token
		);
		response.status(HttpStatus.OK).send({
			id: createdContact?._embedded?.contacts[0].id
		})
	}

	/**
	 * Создание сущности сделки
	 * @param session
	 * @param entityName
	 * @param response
	 */
	@UseGuards(GetauthGuard)
	@Post('/v4/leads')
	async create_lead(
		@Session() session: Record<string, any>,
		@Body() { entityName }: ICreateEntity,
		@Res({ passthrough: true }) response: Response): Promise<void>
	{
		let createdDeal:ICreatedDealResult = await this.apiService.createDeal(
			entityName,
			session.base_domain,
			session.access_token
		);
		response.status(HttpStatus.OK).send({
			id: createdDeal?._embedded?.leads[0].id
		})
	}

}
