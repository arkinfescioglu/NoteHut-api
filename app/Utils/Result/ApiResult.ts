export default class ApiResult<TDATA = null> {
  public success: boolean = true;
  public message: string | null = null;
  public data: TDATA | null = null;
  public isValidationError: boolean = false;
  public validationMessages: any = null;
  public isAuthError: boolean = false;

  constructor(init?: Partial<ApiResult<TDATA>>) {
    if (!!init) {
      Object.assign(this, init);
    }
  }

  public static success(message: string) {
    return new ApiResult({
      success: true,
      message: message,
      data: null,
      isValidationError: false,
      validationMessages: null
    });
  }

  public static successWithData(data: any) {
    return new ApiResult({
      success: true,
      message: null,
      data: data,
      isValidationError: false,
      validationMessages: null
    });
  }

  public static error(message: string) {
    return new ApiResult({
      success: false,
      message: message,
      data: null,
      isValidationError: false,
      validationMessages: null
    });
  }

  public static validationError(data: string) {
    return new ApiResult({
      success: false,
      message: "Validation error.",
      data: null,
      isValidationError: true,
      validationMessages: data
    });
  }

  public static authError(msg: any = null) {
    return new ApiResult({
      success: false,
      message: msg,
      data: null,
      isValidationError: false,
      validationMessages: null,
      isAuthError: true
    });
  }
}
