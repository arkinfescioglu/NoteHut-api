import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResult from 'App/Utils/Result/ApiResult';

export default class ApiAuthMiddleware {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const jwt = auth.use("jwt");
    const isAuth = await jwt?.check?.();
    if (!isAuth) {
      return response.json(
        ApiResult.authError()
      );
    }
    await next()
  }
}
