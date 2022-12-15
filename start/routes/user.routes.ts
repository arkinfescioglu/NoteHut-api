import Route from '@ioc:Adonis/Core/Route'

/**
 * User's Api Routes
 */
Route.group(() => {

  Route.post("/store", "UsersController.store");

  Route.group(() => {

    Route.put("/update", "UsersController.update");

    Route.put("/updatePassword", "UsersController.updatePassword");

  }).middleware(["apiAuth"]);

}).prefix("/api/users")

/**
 * Auth's Api Routes
 */
Route.group(() => {

  Route.post("/login", "AuthController.login");

  Route.post("/logout", "AuthController.logout");

  Route.put("/refreshToken", "AuthController.refreshToken");

  Route.group(() => {

    Route.get("/getAuthUser", "AuthController.getAuthUser");

  }).middleware(["apiAuth"]);

}).prefix("/api/auth")
