const { Router } = require("express");
const {
  adminLogin,
  adminLogout,
} = require("../controllers/admin/admin.controller");
const {
  getAllOwner,
  getAllUser,
  deleteUserById,
  deleteOwnerById,
} = require("..//controllers/admin/adminDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

// unsecured routes

//secured routes (jwt verification needed)
router.route("/login").post(adminLogin);
router.route("/logout").post(adminLogout);
router.route("/dashboard/get-all-user").post(getAllUser);
router.route("/dashboard/delete-user/:userid").delete(deleteUserById);
router.route("/dashboard/get-all-owner").get(getAllOwner);
router.route("/dashboard/delete-owner/:ownerid").delete(deleteOwnerById);

module.exports = router;
