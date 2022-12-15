import ApiException from "../ApiException";


export default class MakeException {

  public static general(message: string, status: number = 200) {
    throw new ApiException(message, status, "E_API_GENERAL");
  }

  public static generalLang(messageCode: string, status: number = 200) {
    throw new ApiException(messageCode, status, "E_API_GENERAL_LANG");
  }

  public static paramReq(param: string) {
    throw new ApiException(param, 200, "E_PARAM_REQUIRED");
  }

  public static notFound() {
    throw new ApiException("error.notFound", 404, "E_NOT_FOUND");
  }

  public static canNotDel() {
    throw new ApiException("error.canNotDel", 200, "E_CANNOT_DELETE");
  }

  public static auth() {
    throw new ApiException("error.authError", 403, "E_AUTH_ERROR");
  }

  public static permission() {
    throw new ApiException("error.permissionError", 403, "E_PERMISSION");
  }

  public static accountNotActive() {
    throw new ApiException("error.accountNotActive", 200, "E_ACCOUNT_NOT_ACTIVE");
  }

  public static insufficientMoney() {
    throw new ApiException("error.insufficientMoney", 200, "E_ENOUGH_MONEY");
  }

}
