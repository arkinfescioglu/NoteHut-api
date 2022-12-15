import Route from "@ioc:Adonis/Core/Route";

/**
 * Auth's Api Routes
 */
Route.group(() => {

  Route.group(() => {

    Route.get("index", "NotesController.index");

    Route.get("show", "NotesController.show");

    Route.post("store", "NotesController.store");

    Route.put("update", "NotesController.update");

    Route.get("toggleIsImportant", "NotesController.toggleIsImportant");

    Route.get("restoreById", "NotesController.restoreById");

    Route.get("destroy", "NotesController.destroy");

  }).middleware(["apiAuth"]);

}).prefix("/api/notes")
