import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from "../auth/auth.service";
import { ConfigService } from "@nestjs/config";
import { IAuthToken} from "../type";

@Injectable()
export class GetauthGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private configService: ConfigService
	) {}

	canActivate(context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean> {
		const session = context.switchToHttp().getRequest()?.session;
		/**
		 * Если токена или домена нет в сессии, либо время жизни истекло
		 * получаем новый токен и записываем в сессию.
		 * Если не получилось, доступ к api не даем
		 */
		if (
			!session.access_token ||
			!session.base_domain ||
			!session.token_expires ||
			(session.token_expires - Date.now() < 10000)
		)
		{
			//запрос нового токена
			return new Promise((resolve) => {
				const apiKey:string = this.configService.get<string>('API_KEY');
				this.authService.getAuthParams(apiKey)
					.then((authParams: IAuthToken) => {
						session.access_token = authParams.access_token;
						session.base_domain = authParams.base_domain;
						session.token_expires = Date.now() + 20*60*1000; //  20 минут
						resolve(true);
					})
					.catch(err => {
						resolve(false);
					})
			})
		}
		else
		{
			return true;
		}
	}
}
