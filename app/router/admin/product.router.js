const {
  ProductController,
} = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/string-to-array");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post(
  "/add",
  uploadFile.array("images", 5),
  stringToArray("tags"),
  ProductController.addProduct
);

router.patch(
  "/edit/:id",
  uploadFile.array("images", 10),
  stringToArray("tags"),
  ProductController.editProduct
);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getOneProduct);

router.delete("/remove/:id", ProductController.removeProduct);

module.exports = {
  AdminProductRouter: router,
};
