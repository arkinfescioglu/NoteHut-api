import type { EventsList } from '@ioc:Adonis/Core/Event'
import NoteCategoryService from "App/Services/NoteCategoryService";
import {inject} from "@adonisjs/fold";
import {i18} from "App/Utils/Helpers";

@inject()
export default class UserListener {

  constructor(
    protected noteCategoryService: NoteCategoryService
  ) {
  }

  public async afterStore(user: EventsList["user:afterStore"]) {
    const lang = i18();
    await this.noteCategoryService.create({
      userId: user.id,
      isMain: true,
      categoryOrder: 0,
      categoryName: lang.formatMessage("noteCategory.generalCategory")
    });
  }

}
