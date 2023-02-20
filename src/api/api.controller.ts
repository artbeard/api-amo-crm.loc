import {Controller, Body, Post, Res, Session, HttpStatus, UseGuards} from '@nestjs/common';
import { Response } from 'express';
import {ApiService} from "./api.service";
import {GetauthGuard} from "../getauth/getauth.guard";

interface ICreateEntity{
	entityName: string
}

@Controller('/api')
export class ApiController {

	constructor(private apiService: ApiService) {}

	@UseGuards(GetauthGuard)
	@Post('/v4/companies')
	async create_company(
		@Session() session: Record<string, any>,
		@Body() { entityName }: ICreateEntity,
		@Res({ passthrough: true }) response: Response)
	{
		let createdCompany = await this.apiService.createCompany(
			entityName,
			session.base_domain,
			session.access_token
		);

		response.status(HttpStatus.OK).send({
			id: createdCompany?._embedded?.companies[0].id
		})
	}


	@UseGuards(GetauthGuard)
	@Post('/v4/contacts')
	async create_contact(
		@Session() session: Record<string, any>,
		@Body() { entityName }: ICreateEntity,
		@Res({ passthrough: true }) response: Response)
	{
		let createdContact = await this.apiService.createContact(
			entityName,
			session.base_domain,
			session.access_token
		);

		response.status(HttpStatus.OK).send({
			id: createdContact?._embedded?.contacts[0].id
		})
	}

	@UseGuards(GetauthGuard)
	@Post('/v4/leads')
	async create_lead(
		@Session() session: Record<string, any>,
		@Body() { entityName }: ICreateEntity,
		@Res({ passthrough: true }) response: Response)
	{
		let createdDeal = await this.apiService.createDeal(
			entityName,
			session.base_domain,
			session.access_token
		);

		response.status(HttpStatus.OK).send({
			id: createdDeal?._embedded?.leads[0].id
		})
	}

}
