import Hash from "@ioc:Adonis/Core/Hash";
import { validator } from '@ioc:Adonis/Core/Validator'
import { auth } from "App/Utils/Helpers";

/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

/*
 * Old password check validation.
 *
 */
validator.rule(
  'oldPassword', // rule name
  async (
    value,
    _,
    options
  ) => {
    let authUser = await auth().use("jwt").authenticate();
    if (
      !authUser ||
      !await Hash.verify(authUser?.password ?? "", value)
    ) {
      options.errorReporter.report(
        options.pointer,
        'oldPassword',
        'oldPassword',
        options.arrayExpressionPointer
      )
    }

  }, // validation callback
  () => {
    return {
      async: true,
      compiledOptions: {},
    }
  }
)
