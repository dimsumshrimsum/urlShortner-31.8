const urls = require("../data/urls-data");
const uses = require("../data/uses-data");
function list(req, res) {
  res.json({ data: urls });
}

function validateHref(req, res, next) {
  if (req.body.data && req.body.data.href) {
    return next();
  } else {
    return next({
      status: 400,
      message: "missing href in request body",
    });
  }
}

function urlExists(req, res, next) {
  //numerify id from req. params
  //find url with id
  //if url exists, set res.locals.url to url
  //if url does not exist, return next with a 404 error

  const urlId = Number(req.params.urlId);
  const foundUrl = urls.findIndex((url) => url.id === urlId);

  if (foundUrl >= 0) {
    res.locals.index = foundUrl;
    res.locals.url = urls[foundUrl];
    next();
  } else {
    next({
      status: 404,
      message: `Url with id ${urlId} does not exist.`,
    });
  }
}

function create(req, res, next) {
  const {
    data: { href },
  } = req.body;

  const newUrl = {
    id: urls.length + 1,
    href,
  };

  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function read(req, res) {
  const newUse = {
    id: uses.length + 1,
    urlId: res.locals.url.id,
    time: Date.now(),
  };
  uses.push(newUse);
  res.json({ data: res.locals.url });
}

function update(req, res) {
  const url = res.locals.url;
  const { data: { href } = {} } = req.body;
  const newUrl = { ...url, href };
  urls[urls.indexOf(url)] = newUrl;
  res.json({ data: newUrl });
}

function listUrlUses(req, res) {
  const { urlId } = req.params;
  const filteredUses = uses.filter((use) => use.urlId === Number(urlId));
  res.json({ data: filteredUses });
}

module.exports = {
  list,
  urlExists,
  create: [validateHref, create],
  read: [urlExists, read],
  update: [urlExists, validateHref, update],
  listUrlUses: [urlExists, listUrlUses],
};
