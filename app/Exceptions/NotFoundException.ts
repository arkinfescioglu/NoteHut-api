import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ApiResult from 'App/Utils/Result/ApiResult';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new NotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotFoundException extends Exception {
  public async handle(_: this, { response, i18n }: HttpContextContract) {
    response.status(404).send(
      ApiResult.error(i18n.formatMessage("errors.notFound"))
    )
  }
}
