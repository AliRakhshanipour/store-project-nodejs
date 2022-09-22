const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();

router.post("/add", CategoryController.addCategory);

router.delete("/remove/:categoryId", CategoryController.removeCategory);

router.get("/parents", CategoryController.getParentCategory);

router.get("/children/:parentId", CategoryController.getChildrenOfParent);

router.get("/children-all", CategoryController.getAllCategories);

router.patch("/edit-category/:categoryId", CategoryController.editCategory);

router.get("/get-category/:categoryId", CategoryController.getCategoryById);
module.exports = {
  AdminCategoryRouter: router,
};
