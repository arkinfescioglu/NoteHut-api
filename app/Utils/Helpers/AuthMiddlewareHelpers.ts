import {GuardsList} from "@ioc:Adonis/Addons/Auth";
import MakeException from "App/Exceptions/ExceptionHelpers/MakeException";
import User from "App/Models/User";


export default class AuthMiddlewareHelpers {

  public static async checkIsLogin(apiAuth: GuardsList["jwt"]['implementation']) {
    const checkLogin = await apiAuth.check();
    if (!checkLogin)
      return MakeException.auth();
    return true;
  }

  public static checkIsAdmin(authUser: User) {
    if (!authUser.isAdmin)
      return MakeException.permission();
    return true;
  }
}
