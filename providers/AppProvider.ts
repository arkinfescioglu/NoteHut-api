import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import ApiResult from 'App/Utils/Result/ApiResult';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {
  }

  public register() {
    // Register your own bindings
  }

  public async boot() {
    this.setResponseMacros();
    this.setRequestMacros();
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }

  protected setResponseMacros() {
    const Response = this.app.container.use('Adonis/Core/Response');

    /**
     * Success Result With Message.
     */
    Response.macro('success', function (messages: any = null) {
      let { ctx } = this;
      let result = messages ?? ctx!.i18n?.formatMessage("success.success");
      return ctx!.response.json(
        ApiResult.success(
          result ?? "success"
        )
      );
    });

    /**
     * Success Result With Data.
     */
    Response.macro('successWithData', function (data: any) {
      return this.ctx!.response.json(
        ApiResult.successWithData(
          data
        )
      );
    });

    /**
     * Error Result With Message.
     */
    Response.macro('error', function (message: any = null) {
      let { ctx } = this;
      return ctx!.response.json(
        ApiResult.error(
          message ?? ctx!.i18n?.formatMessage("error.system")
        )
      );
    });

  }

  protected setRequestMacros() {
    const Request = this.app.container.use('Adonis/Core/Request')

    /**
     * İs request header has json format.
     */
    Request.macro('wantsJSON', function (): any {
      const types = this.types()
      return (
        types[0] && (types[0].includes('/json') || types[0].includes('+json'))
      )
    });

    Request.macro('getId', function (module: any = null): any {
      let { ctx } = this;
      if (!module) {
        return ctx!.request.input("id");
      }
      return ctx!.request.input(`${module}Id`);
    });
  }
}
