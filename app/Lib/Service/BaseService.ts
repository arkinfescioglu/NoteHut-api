import MakeException from "App/Exceptions/ExceptionHelpers/MakeException";

export default abstract class BaseService {

  protected valueIsset(val: any) {

    if(!val)
      return MakeException.paramReq("");

    return !!val;

  }
}
