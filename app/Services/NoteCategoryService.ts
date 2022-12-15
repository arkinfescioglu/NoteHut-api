import BaseService from "App/Lib/Service/BaseService";
import {inject} from "@adonisjs/fold";
import NoteCategoryRepository from "App/Repositories/NoteCategoryRepository";
import {ActionsAuthorizerContract} from "@ioc:Adonis/Addons/Bouncer";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import MakeException from "App/Exceptions/ExceptionHelpers/MakeException";

@inject()
export default class NoteCategoryService extends BaseService {
  constructor(protected repository: NoteCategoryRepository) {
    super();
  }

  public async getAllByUserId(
    userId: string,
    orderBy: "created_at" | "categoryOrder" = "categoryOrder"
  ) {
    return await this.repository.findByUserId(userId, orderBy);
  }

  public async create(input: ICreateInput) {
    input.isMain = input.isMain ?? 0;
    input.categoryOrder = input.categoryOrder ?? 0;
    return await this.repository.create(input);
  }

  public async updateById(input: IUpdateInput) {

    const category = await this.repository.findOrError(input.id);

    await input.bouncer
      .with("NoteCategoryPolicy")
      .authorize("update", category);

    await category.merge({
      categoryName: input.categoryName,
      categoryOrder: input.categoryOrder,
    }).save();

    return category;
  }

  public async deleteById(input: IDeleteInput) {

    const category = await this.repository.findOrError(input.id, ["id", "userId"]);

    await input.bouncer
      .with("NoteCategoryPolicy")
      .authorize("delete", category);

    if(category.isMain)
      return MakeException.canNotDel();

    await category.delete();

    return true;

  }
}

interface ICreateInput {
  userId: string;
  categoryName: string;
  categoryOrder: number;
  isMain: boolean;
}

interface IUpdateInput {
  id: string;
  // userId: string;
  categoryName: string;
  categoryOrder: number;
  // isMain: boolean;
  bouncer: ActionsAuthorizerContract<Exclude<HttpContextContract['auth']['user'], undefined>>;
}

interface IDeleteInput {
  id: string;
  bouncer: ActionsAuthorizerContract<Exclude<HttpContextContract['auth']['user'], undefined>>;
}
