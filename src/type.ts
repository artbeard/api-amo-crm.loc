export enum EntityType{
	deal	= 'leads',
	contact = 'contacts',
	company = 'companies'
}

export interface IAuthToken {
	access_token: string,
	base_domain: string
}


export interface ICreateEntity{
	entityName: string
}
interface IEntityResult{
	id: number,
	request_id?: string,
	_links?: any
}
interface ICompanyResult{
	companies: IEntityResult[]
}

interface IContactResult{
	contacts: IEntityResult[]
}

interface IDealResult{
	leads: IEntityResult[]
}

export interface ICreatedResult{
	[key: string]: any,
	_embedded: ICompanyResult | IContactResult | IDealResult
}

export interface ICreatedCompanyResult extends ICreatedResult{
	_embedded: ICompanyResult
}
export interface ICreatedContactResult extends ICreatedResult{
	_embedded: IContactResult
}
export interface ICreatedDealResult extends ICreatedResult{
	_embedded: IDealResult
}

