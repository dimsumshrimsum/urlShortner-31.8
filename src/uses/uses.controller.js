const uses = require("../data/uses-data");

function useExists(req, res, next) {
  const { useID } = req.params;
  const { urlId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useID));
  if (foundUse && (!urlId || foundUse.urlId == urlId)) {
    res.locals.use = foundUse;
    return next();
  } else {
    next({
      status: 404,
      message: `Use id not found: ${useID} ${urlId ? `for url: ${urlId}` : ""}`,
    });
  }
}

function list(req, res) {
  const { urlId } = req.params;

  res.json({
    data: uses.filter(
      urlId
        ? (use) => use.urlId == Number(urlId)
        : () => {
            return true;
          }
    ),
  });
}

function read(req, res) {
  res.json({ data: res.locals.use });
}

function destroy(req, res, next) {
  const { useID } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useID));
  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [useExists, read],
  delete: [useExists, destroy],
};
