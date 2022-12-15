import BaseService from "App/Lib/Service/BaseService";
import {inject} from "@adonisjs/fold";
import NoteRepository from "App/Repositories/NoteRepository";
import NoteCategoryRepository from "App/Repositories/NoteCategoryRepository";
import MakeException from "App/Exceptions/ExceptionHelpers/MakeException";
import {ActionsAuthorizerContract} from "@ioc:Adonis/Addons/Bouncer";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

@inject()
export default class NoteService extends BaseService {
  constructor(
    protected repository: NoteRepository,
    protected noteCategoryRepository: NoteCategoryRepository,
  ) {
    super();
  }

  public async getAll(input: IGetByCategoryId) {

    if (input.categoryId) {
      const isCategoryAuthor = await this.noteCategoryRepository.isAuthor(
        input.categoryId,
        input.userId
      );
      if (!isCategoryAuthor)
        return MakeException.permission();
    }

    return await this.repository.fetchAll({
      categoryId: input.categoryId,
      userId: input.userId,
      offset: input.offset ?? 0,
      search: input.search,
      isImportant: input.isImportant,
      isTrash: input.isTrash
    });
  }

  public async getById(input: IIdInput) {

    const note = await this.repository.findOrError(input?.id);

    await input.bouncer
      .with("NotePolicy")
      .authorize("view", note);

    return note;
  }

  public async toggleIsImportant(input: IIdInput) {
    const note = await this.repository.findOrError(input?.id);

    if (note.userId !== input.userId)
      return MakeException.permission();

    await note.merge({
      isImportant: !note.isImportant
    }).save();

    await note.load("category", categoryQuery => {
      categoryQuery.select([
        "id",
        "categoryName",
        "categoryOrder",
        "isMain"
      ])
    });

    return note;
  }

  public async create(input: ICreateInput) {

    let categoryId = input?.categoryId;

    if (!categoryId) {
      const category = await this.noteCategoryRepository.getMainByUserId(input.userId);
      if (category) {
        categoryId = category.id;
      }
    }
    else {
      const isCategoryAuthor = await this.noteCategoryRepository.isAuthor(
        categoryId,
        input.userId
      );
      if (!isCategoryAuthor)
        return MakeException.permission();
    }

    return await this.repository.create({
      userId: input.userId,
      categoryId: categoryId as any,
      noteTitle: input.noteTitle,
      noteContent: input.noteContent,
      isImportant: input?.isImportant ?? false
    });
  }

  public async updateById(input: IUpdateInput) {

    const note = await this.repository.findOrError(input?.id);

    if (note.userId !== input.userId)
      return MakeException.permission();

    let categoryId = input?.categoryId;

    if (!categoryId) {
      const category = await this.noteCategoryRepository.getMainByUserId(input.userId);
      if (category) {
        categoryId = category.id;
      }
    }
    else {
      const isCategoryAuthor = await this.noteCategoryRepository.isAuthor(
        categoryId,
        input.userId
      );
      if (!isCategoryAuthor)
        return MakeException.permission();
    }

    await note.merge({
      categoryId: categoryId as any,
      noteTitle: input.noteTitle,
      noteContent: input.noteContent,
      isImportant: input?.isImportant ?? false
    }).save();

    return note;
  }

  public async deleteById(input: IDeleteInput) {

    const note = await this.repository.findOrError(input?.id);

    if (note.userId !== input.userId)
      return MakeException.permission();

    if (note.isTrash) {
      await note.delete();
    }
    else {
      await note.merge({
        isTrash: true,
        isImportant: false
      }).save();
    }

    return note;

  }

  public async restoreById(input: IIdInput) {
    const note = await this.repository.findOrError(input?.id);

    if (note.userId !== input.userId)
      return MakeException.permission();

    await note.merge({
      isTrash: false
    }).save();

    return note;
  }
}

interface ICreateInput {
  userId: string;
  categoryId: string | null;
  noteTitle: string;
  noteContent: string;
  isImportant: boolean | null;
}

interface IUpdateInput extends IIdInput {
  userId: string;
  categoryId: string | null;
  noteTitle: string;
  noteContent: string;
  isImportant: boolean | null;
}

interface IDeleteInput extends IIdInput {
}

interface IIdInput {
  id: string;
  userId?: string;
  bouncer: ActionsAuthorizerContract<Exclude<HttpContextContract['auth']['user'], undefined>>;
}

interface IGetByCategoryId {
  categoryId: string;
  userId: string;
  offset?: any;
  search: any;
  isImportant: any;
  isTrash: any;
}
