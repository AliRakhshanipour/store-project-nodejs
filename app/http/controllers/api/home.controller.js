const createHttpError = require("http-errors");
const { authSchema } = require("../../validators/user/auth.schema");
const { Controller } = require("../controller");

class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      return res.status(200).json("Index Page Store");
    } catch (error) {
      next(createHttpError.NotFound(error));
    }
  }
}

module.exports = {
  HomeController: new HomeController(),
};
