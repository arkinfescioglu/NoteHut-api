import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import ApiController from "../ApiController";
import {inject} from "@adonisjs/fold";
import NoteService from 'App/Services/NoteService';
import NoteStoreValidator from "App/Validators/NoteStoreValidator";

@inject()
export default class NotesController extends ApiController {
  constructor(
    protected service: NoteService
  ) {
    super();
  }

  public async index({request, response, auth}: HttpContextContract) {

    const apiAuth = auth.use("jwt");

    const authUser = apiAuth?.user! ?? await apiAuth.authenticate();

    const notes = await this.service.getAll({
      categoryId: request.input("categoryId"),
      offset: request.input("offset"),
      userId: authUser.id,
      isImportant: request.input("isImportant"),
      isTrash: request.input("isTrash"),
      search: request.input("search")
    });

    return response.successWithData(notes);

  }

  public async show({request, response, bouncer}: HttpContextContract) {

    const note = await this.service.getById({
      id: request.input("id"),
      bouncer: bouncer
    });

    return response.successWithData(note);

  }

  public async store({request, response, auth}: HttpContextContract) {

    const apiAuth = auth.use("jwt");

    const authUser = apiAuth?.user! ?? await apiAuth.authenticate();

    const input = await request.validate(NoteStoreValidator);

    const note = await this.service.create({
      userId: authUser.id,
      categoryId: input?.categoryId as any,
      noteContent: input.noteContent,
      noteTitle: input.noteTitle,
      isImportant: input.isImportant as any
    });

    return response.successWithData(note);

  }

  public async update({request, response, auth, bouncer}: HttpContextContract) {

    const apiAuth = auth.use("jwt");

    const authUser = apiAuth?.user! ?? await apiAuth.authenticate();

    const input = await request.validate(NoteStoreValidator);

    const note = await this.service.updateById({
      id: request.input("id"),
      userId: authUser.id,
      categoryId: input?.categoryId as any,
      noteContent: input.noteContent,
      noteTitle: input.noteTitle,
      isImportant: input.isImportant as any,
      bouncer: bouncer
    });

    return response.successWithData(note);

  }

  public async toggleIsImportant({request, response, bouncer, auth}: HttpContextContract) {

    const apiAuth = auth.use("jwt");

    const authUser = apiAuth?.user! ?? await apiAuth.authenticate();

    const note = await this.service.toggleIsImportant({
      id: request.input("id"),
      userId: authUser.id,
      bouncer: bouncer
    });

    return response.successWithData(note);

  }

  public async restoreById({request, response, bouncer, auth}: HttpContextContract) {

    const apiAuth = auth.use("jwt");

    const authUser = apiAuth?.user! ?? await apiAuth.authenticate();

    const note = await this.service.restoreById({
      id: request.input("id"),
      userId: authUser.id,
      bouncer: bouncer
    });

    return response.successWithData(note);

  }

  public async destroy({request, response, bouncer, auth}: HttpContextContract) {

    const apiAuth = auth.use("jwt");

    const authUser = apiAuth?.user! ?? await apiAuth.authenticate();

    const note = await this.service.deleteById({
      id: request.input("id"),
      userId: authUser.id,
      bouncer: bouncer
    });

    return response.successWithData(note);

  }
}
