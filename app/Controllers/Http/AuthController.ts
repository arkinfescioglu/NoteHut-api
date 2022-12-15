import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiController from "../ApiController";
import { inject } from "@adonisjs/fold";
import AuthService from 'App/Services/AuthService';
import LoginValidator from 'App/Validators/LoginValidator';

@inject()
export default class AuthController extends ApiController {
    constructor(
        protected service: AuthService
    ) {
        super();
    }

    public async login({ request, response, auth }: HttpContextContract) {
        const input = await request.validate(LoginValidator);
        let token = await this.service.login({
            email: input.email,
            password: input.password,
            auth: auth
        });
        return response.successWithData(token);
    }

    public async getAuthUser({ response, auth }: HttpContextContract) {

      const apiAuth = auth.use("jwt");

      const authUser = await apiAuth?.authenticate();

      return response.successWithData(authUser);
    }

    public async refreshToken({ request, response, auth }: HttpContextContract) {
        const token = await this.service.refreshToken({
            auth: auth,
            refreshToken: request.input("refreshToken")
        });
        return response.successWithData(token);
    }

    public async logout({ response, auth }: HttpContextContract) {
        await auth.use("jwt").revoke();
        return response.success();
    }
}
