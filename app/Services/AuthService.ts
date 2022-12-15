import BaseService from "App/Lib/Service/BaseService";
import {inject} from "@adonisjs/fold";
import UserRepository from "App/Repositories/UserRepository";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";
import ApiException from "App/Exceptions/ApiException";
import Hash from "@ioc:Adonis/Core/Hash";
import MakeException from "App/Exceptions/ExceptionHelpers/MakeException";

@inject()
export default class AuthService extends BaseService {
  constructor(protected repository: UserRepository) {
    super();
  }

  public async login({email, password, auth}: ILoginInput) {

    let user = await this.repository.findWhereOneBy("email", email);

    if (!user)
      throw new ApiException("email.notFound", 200, "E_EMAIL_NOT_FOUND");
    if (!await Hash.verify(user.password, password))
      throw new ApiException("passwordNotCorrect", 200, "E_PASSWORD_NOT_CORRECT");

    let token = await auth.use("jwt").login(user, {
      payload: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        type: user.userType,
      },
    });
    return token;
  }

  public async refreshToken({auth, refreshToken}: IRefreshToken) {
    if (!refreshToken)
      return MakeException.paramReq("refreshToken");
    const jwt = auth.use("jwt");
    const user = await jwt.authenticate();
    const token = await jwt.loginViaRefreshToken(refreshToken, {
      payload: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        type: user.userType,
      },
    });
    return token;
  }
}


interface ILoginInput {
  email: string;
  password: string;
  auth: AuthContract;
}

interface IRefreshToken {
  auth: AuthContract;
  refreshToken: string;
}
