import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiController from "../ApiController";
import { inject } from "@adonisjs/fold";
import NoteCategoryService from 'App/Services/NoteCategoryService';
import NoteCategoryStoreValidator from "App/Validators/NoteCategoryStoreValidator";

@inject()
export default class NoteCategoriesController extends ApiController {
    constructor(
        protected service: NoteCategoryService
    ) {
        super();
    }

    public async index({request, response, auth}: HttpContextContract) {

      const apiAuth = auth.use("jwt");
      const authUser = apiAuth?.user! ?? await apiAuth.authenticate();

      const categories = await this.service.getAllByUserId(
        authUser.id,
        request.input("orderBy") ?? "categoryOrder"
      );

      return response.successWithData(categories);

    }

    public async store({request, response, auth}: HttpContextContract) {

      const apiAuth = auth.use("jwt");
      const authUser = apiAuth?.user! ?? await apiAuth.authenticate();

      const input = await request.validate(NoteCategoryStoreValidator);

      const category = await this.service.create({
        categoryName: input.categoryName,
        categoryOrder: input.categoryOrder as any,
        userId: authUser.id,
        isMain: false
      });

      return response.successWithData(category);

    }

    public async update({request, response, bouncer}: HttpContextContract) {

      const input = await request.validate(NoteCategoryStoreValidator);

      const category = await this.service.updateById({
        categoryName: input.categoryName,
        categoryOrder: input.categoryOrder as any,
        id: request.input("id"),
        bouncer: bouncer
      });

      return response.successWithData(category);

    }

    public async destroy({request, response, bouncer}: HttpContextContract) {

      const category = await this.service.deleteById({
        id: request.input("id"),
        bouncer: bouncer
      });

      return response.successWithData(category);

    }
}
