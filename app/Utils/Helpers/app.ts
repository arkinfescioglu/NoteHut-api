import { HttpContext } from "@adonisjs/core/build/standalone";

export const getCtx = () => HttpContext.get();

export const auth = () => getCtx()!.auth;

export const request = () => getCtx()!.request;

export const route = () => getCtx()?.route;

export const response = () => getCtx()!.response;

export const i18 = () => getCtx()!.i18n;
