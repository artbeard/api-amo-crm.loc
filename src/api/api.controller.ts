import {Controller, Body, Post, Req, Res, Headers, Session, HttpStatus, HttpException} from '@nestjs/common';
import { Request, Response } from 'express';
import {AuthService} from "../auth/auth.service";
import {ApiService} from "./api.service";

interface ICreateEntity{
	entityName: string
}

@Controller('/api')
export class ApiController {

	//constructor(private authService: AuthService) {}
	constructor(private apiService: ApiService) {}


	@Post('/v4/companies')
	async create_company(
		//@Headers() apiKey: Request,
		@Session() session: Record<string, any>,
		@Body() { entityName }: ICreateEntity,
		@Res({ passthrough: true }) response: Response)
	{
		if (!session.access_token || !session.base_domain)
		{
			let sessionRequest = await this.apiService.getAuthParams('30878566');
			session.access_token = sessionRequest.access_token;
			session.base_domain = sessionRequest.base_domain;
		}

		let createdCompany;
		try {
			createdCompany = await this.apiService.createCompany(
				entityName,
				session.base_domain,
				session.access_token
			);
		}
		catch (e)
		{
			session.access_token = null;
			session.base_domain = null;
			throw e;
		}



		response.status(HttpStatus.OK).send({
			id: createdCompany?._embedded?.companies[0].id
		})
	}

	@Post('/v4/contacts')
	async create_contact(
		@Headers('Authorization') authToken: string,
		@Body() { entityName }: ICreateEntity,
		@Res({ passthrough: true }) response: Response)
	{
		if (!authToken)
		{
			response.status(HttpStatus.UNAUTHORIZED).send({
				detail: 'Необходима авторизация',
			})
			return;
		}

		let x:boolean = await new Promise(resolve => {
			setTimeout(()=>{
				resolve(Math.random() > 0.1)
			},1000)
		})
		if (x)
		{
			response.status(HttpStatus.OK).send({
				id: Math.random() * 1000,
			})
		}
		else
		{
			response.status(HttpStatus.BAD_REQUEST).send({
				detail: 'ОШибка созданя сущности'
			})
		}
	}

	@Post('/v4/leads')
	async create_lead(
		@Headers('Authorization') authToken: string,
		@Body() { entityName }: ICreateEntity,
		@Res({ passthrough: true }) response: Response)
	{
		if (!authToken)
		{
			response.status(HttpStatus.UNAUTHORIZED).send({
				detail: 'Необходима авторизация',
			})
			return;
		}

		let x:boolean = await new Promise(resolve => {
			setTimeout(()=>{
				resolve(Math.random() > 0.1)
			},1000)
		})
		if (x)
		{
			response.status(HttpStatus.OK).send({
				id: Math.random() * 1000,
			})
		}
		else
		{
			response.status(HttpStatus.BAD_REQUEST).send({
				detail: 'ОШибка созданя сущности'
			})
		}
	}

}
