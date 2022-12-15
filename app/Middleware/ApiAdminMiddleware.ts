import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthMiddlewareHelpers from "App/Utils/Helpers/AuthMiddlewareHelpers";

export default class ApiAdminMiddleware {

  protected helper = AuthMiddlewareHelpers;

  public async handle({auth}: HttpContextContract, next: () => Promise<void>) {

    const apiAuth = auth.use("jwt");

    await this.helper.checkIsLogin(apiAuth);

    const authUser = apiAuth.user! ?? await apiAuth.authenticate();

    this.helper.checkIsAdmin(authUser);

    await next()
  }

}
