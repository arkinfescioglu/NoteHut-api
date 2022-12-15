import { LucidModel, ModelAttributes } from "@ioc:Adonis/Lucid/Orm";

export type RepositoryColumnsType =
    any[]
    | "*"
    | null;


export type OrderByDirectionType = "asc" | "desc";

export type RepositoryRelationType = any[] | null;

export type RepositoryCrudInputType<RelatedModel extends LucidModel> = Partial<ModelAttributes<InstanceType<RelatedModel>>>
