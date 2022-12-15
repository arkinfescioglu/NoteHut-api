import {LucidModel, ModelAttributes, ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";
import {RepositoryColumnsType, RepositoryCrudInputType} from "./types/BaseRepositoryTypes";
import Database from '@ioc:Adonis/Lucid/Database';
import ApiException from "App/Exceptions/ApiException";
import MakeException from "App/Exceptions/ExceptionHelpers/MakeException";

export default abstract class BaseRepository<RelatedModel extends LucidModel> {

  protected model: RelatedModel;

  protected offsetLimit: number = 25;

  //private isBooted: boolean = false;

  constructor(model: RelatedModel) {

    this.makeModel(model);

    this.boot();

  }

  /**
   * it runs when class is loading.
   *
   * @protected
   */
  protected async boot() {

  }

  private makeModel(model: RelatedModel) {
    this.model = model;
  }


  public async first() {
    return this.model.first();
  }

  /**
   * Gives all model data.
   *
   * !!if number of records is too large, it will be very slow.!!
   *
   * @param columns
   * @param relations
   */
  public async getAll(columns: RepositoryColumnsType = "*") {
    return await this.getModelQuery()
      .select(BaseRepository.getColumns(columns))
      .orderBy("id", "desc")
      .exec();
  }

  /**
   * Find model by given model id.
   * if model will not find, it will give exception.
   *
   * @param id
   * @param columns
   * @param relations
   */
  public async findOrError(id: any, columns: RepositoryColumnsType = "*") {
    this.checkParam(id);
    let model = await this.getModelQuery()
      .select(BaseRepository.getColumns(columns))
      .where("id", id)
      .first();
    if (!model) throw new ApiException("error.notFound", 200, "E_NOT_FOUND");
    return model;
  }

  /**
   * Find model by given model column and value.
   * if model will not find, it will give exception.
   *
   * @param column
   * @param value
   * @param relations
   */
  public async findWhereOneBy(column: string, value: any) {
    return await this.getModelQuery()
      .where(column, value)
      .first();
  }

  /**
   * Creates new data.
   *
   * @param inputs
   */
  public async create(inputs: Partial<ModelAttributes<InstanceType<RelatedModel>>>) {
    const trx = await Database.transaction();
    return (await this.model.create(inputs)).useTransaction(trx);
  }

  /**
   * Creates multi data.
   *
   * @param inputs
   */
  public async createMany(inputs: any[]) {
    return await this.model.createMany(inputs);
  }

  /**
   * Update and save model by given model id.
   *
   * @param inputs
   * @param id
   */
  public async updateById(inputs: RepositoryCrudInputType<RelatedModel>, id: any) {
    let model = await this.findOrError(id);
    await model.merge(inputs).save();
    return model;
  }

  /**
   * Delete model by given model id.
   *
   * @param id
   */
  public async deleteById(id: any): Promise<boolean> {
    let model = await this.findOrError(id, ["id"]);
    await model.delete();
    return true;
  }

  /**
   * Delete multi data from database by ids.
   *
   * @param ids
   * @returns
   */
  public async deleteMulti(ids: any[]) {
    for (let id of ids) {
      await this.deleteById(id);
    }
    return true;
  }

  public getModel() {
    return this.model;
  }

  protected getModelQuery() {
    return this.withQuery();
  }

  protected checkParam(param: any) {
    if (!param)
      return MakeException.paramReq("");
  }

  public modelWithQuery() {
    return this.model.query();
  }

  private withQuery(): ModelQueryBuilderContract<RelatedModel> {
    return this.model.query();
  }

  private static getColumns(columns: RepositoryColumnsType): any {
    if (columns && Array.isArray(columns) && columns.length > 0) {
      return columns;
    }
    if (!columns) return "*";
    return columns;
  }
}
