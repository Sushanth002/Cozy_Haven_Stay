const { Router } = require("express");

const {
  adminLogin,
  adminLogout,
} = require("../controllers/admin/admin.controller");
const {
  getAdminById,
  getAllUser,
  deleteUserById,
  getAllOwner,
  deleteOwnerById,
} = require("../controllers/admin/adminDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const { adminValidator } = require("../middlewares/validation.middleware.js");

const router = Router();

// unsecured routes
router.route("/login").post(adminValidator, adminLogin);
//secured routes (jwt verification needed)
router.route("/logout/:adminid").post(verifyJWT, adminLogout);
router.route("/dashboard/getadmin/:adminid").get(verifyJWT, getAdminById);
router.route("/dashboard/get-all-user").get(verifyJWT, getAllUser);
router
  .route("/dashboard/delete-user/:userid")
  .delete(verifyJWT, deleteUserById);
router.route("/dashboard/get-all-owner").get(verifyJWT, getAllOwner);
router
  .route("/dashboard/delete-owner/:ownerid")
  .delete(verifyJWT, deleteOwnerById);

module.exports = router;
