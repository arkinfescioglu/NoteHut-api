import Route from "@ioc:Adonis/Core/Route";

/**
 * Auth's Api Routes
 */
Route.group(() => {

  Route.group(() => {

    Route.get("index", "NoteCategoriesController.index");

    Route.post("store", "NoteCategoriesController.store");

    Route.put("update", "NoteCategoriesController.update");

    Route.delete("destroy", "NoteCategoriesController.destroy");

  }).middleware(["apiAuth"])

}).prefix("/api/notes/categories")
