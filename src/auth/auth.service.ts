import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";


@Injectable()
export class AuthService {
	constructor(private readonly httpService: HttpService) {}


}
