import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
| new ParamReqException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ParamReqException extends Exception {
    public async handle(error: this, ctx: HttpContextContract) {
        let formatMessage = ctx.i18n.formatMessage("error.paramReq");
        return ctx.response.status(200).send(
            ApiResult.error(`${formatMessage} ${error.message}`)
        );
    }
}
