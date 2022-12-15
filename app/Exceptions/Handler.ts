/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import ApiResult from 'App/Utils/Result/ApiResult';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    console.log(error);

    /**
     * Self handle the validation exception
     */
    switch (error?.code) {

      /**
       |* Api Auth error
       |*/
      case "E_INVALID_API_TOKEN": {
        return ctx.response.status(200).send(
          ApiResult.authError()
        );
      }

      /**
       |* Api Auth error
       |*/
      case "E_AUTH_ERROR": {
        return ctx.response.status(200).send(
          ApiResult.authError(
            ctx.i18n.formatMessage("error.authError")
          )
        );
      }

      /**
       |* Validation Error
       |*/
      case "E_VALIDATION_FAILURE": {
        return ctx.response.status(200).send(
          ApiResult.validationError(error.messages.errors)
        );
      }

      /**
       |* DB data not found Error
       |*/
      case "E_ROW_NOT_FOUND": {
        return ctx.response.status(404).send(
          ApiResult.error(
            ctx.i18n.formatMessage("error.notFound")
          )
        );
      }

      /**
       |* DE_ENOUGH_MONEY found Error
       |*/
      case "E_ENOUGH_MONEY": {
        return ctx.response.status(200).send(
          ApiResult.error(
            ctx.i18n.formatMessage("error.insufficientMoney")
          )
        );
      }

      case "E_EMAIL_NOT_FOUND": {
        return ctx.response.status(200).send(
          ApiResult.error(
            ctx.i18n.formatMessage("error.emailNotFound")
          )
        );
      }

      case "E_PASSWORD_NOT_CORRECT": {
        return ctx.response.status(200).send(
          ApiResult.error(
            ctx.i18n.formatMessage("error.passwordNotCorrect")
          )
        );
      }

      case "E_PARAM_REQUIRED": {
        let formatMessage = ctx.i18n.formatMessage("error.paramReq");
        return ctx.response.status(200).send(
          ApiResult.error(`${formatMessage}`)
        );
      }

      /**
       |* E_API_GENERAL Error
       |*/
      case "E_API_GENERAL": {
        return ctx.response.status(200).send(
          ApiResult.error(
            error.message
          )
        );
      }

      /**
       |* E_PERMISSION Error
       |*/
      case "E_PERMISSION": {
        return ctx.response.status(200).send(
          ApiResult.error(
            ctx.i18n.formatMessage("error.permissionError")
          )
        );
      }

      /**
       |* E_PERMISSION Error
       |*/
      case "E_CANNOT_DELETE": {
        return ctx.response.status(200).send(
          ApiResult.error(
            ctx.i18n.formatMessage("error.canNotDel")
          )
        );
      }

      /**
       |* E_ACCOUNT_NOT_ACTIVE Error
       |*/
      case "E_ACCOUNT_NOT_ACTIVE": {
        return ctx.response.status(200).send(
          ApiResult.error(
            ctx.i18n.formatMessage("error.accountNotActive")
          )
        );
      }

      /**
       |* E_API_GENERAL Error
       |*/
      case "E_API_GENERAL_LANG": {
        return ctx.response.status(200).send(
          ApiResult.error(
            ctx?.i18n?.formatMessage?.(error.message) ?? error.message
          )
        );
      }

      /**
       |* DB data not found Error
       |*/
      case "E_NOT_FOUND": {
        return ctx.response.status(200).send(
          ApiResult.error(
            ctx.i18n.formatMessage("error.notFound")
          )
        );
      }

      /**
       * Wrong username or password when login.
       */
      case "E_INVALID_AUTH_UID": {
        return ctx.response.status(200).send(
          ApiResult.error(
            ctx.i18n.formatMessage("users.auth.wrongPasswords")
          )
        );
      }

    }
  }
}
