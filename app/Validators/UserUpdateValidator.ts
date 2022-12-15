import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from "App/Validators/BaseValidator";

export default class UserUpdateValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super();
  }

  public refs = schema.refs({
    userId: this.ctx.auth.use("jwt").user!.id
  })

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({

    email: schema.string({
      trim: true,
      escape: true,
    }, [
      rules.email(),
      rules.maxLength(100),
      rules.unique({
        table: 'users', column: 'email', whereNot: {
          id: this.refs.userId
        }
      }),
    ]),

    name: schema.string({
      trim: true,
      escape: true,
    }, [
      rules.maxLength(80)
    ]),

    lastname: schema.string({
      trim: true,
      escape: true,
    }, [
      rules.maxLength(80)
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  //public messages: CustomMessages = this.ctx.i18n.validatorMessages("product.validation")
}
