const router = require("express").Router({ mergeParams: true });
const useController = require("./uses.controller");

const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(useController.list).all(methodNotAllowed);

router
  .route("/:useID")
  .get(useController.read)
  .delete(useController.delete)
  .all(methodNotAllowed);

module.exports = router;
