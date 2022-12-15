import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import ApiController from "../ApiController";
import {inject} from "@adonisjs/fold";
import UserService from 'App/Services/UserService';
import UserStoreValidator from 'App/Validators/UserStoreValidator';
import UserUpdateValidator from 'App/Validators/UserUpdateValidator';
import UpdateUserPasswordValidator from 'App/Validators/UpdateUserPasswordValidator';
import Event from '@ioc:Adonis/Core/Event'

@inject()
export default class UsersController extends ApiController {
  constructor(
    protected service: UserService
  ) {
    super();
  }

  public async store({request, response}: HttpContextContract) {

    let input = await request.validate(UserStoreValidator);

    let newUser = await this.service.create(input);

    Event.emit("user:afterStore", newUser).then(() => true);

    return response.successWithData(newUser);

  }

  public async update({request, response, auth}: HttpContextContract) {

    const apiAuth = auth.use("jwt");

    const authUser = await apiAuth.authenticate();

    let input = await request.validate(UserUpdateValidator);

    let user = await this.service.updateById(input as any, authUser.id);

    return response.successWithData(user);
  }

  public async updatePassword({request, response, auth}: HttpContextContract) {
    const apiAuth = auth.use("jwt");

    const authUser = apiAuth?.user! ?? await apiAuth.authenticate();

    let input = await request.validate(UpdateUserPasswordValidator);

    let user = await this.service.updateById({
      password: input.password
    } as any, authUser.id);

    return response.successWithData(user);
  }
}
