const router = require("express").Router({ mergeParams: true });
const usesRouter = require("../uses/uses.router");
const controller = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:urlId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

router.use("/:urlId/uses", controller.urlExists, usesRouter);
module.exports = router;
