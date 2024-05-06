const models = require("../../models/index");

// get admin by id
// 1->admin dashboard -> admin profile
module.exports.getAdminById = async (id) => {
  try {
    const result = await models.adminModel.findByPk(id);

    if (!result) {
      throw new Error("admin with given id not found");
    }
    return result?.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// get admin by email
// 1->admin login
module.exports.getAdminByEmail = async (email_id) => {
  try {
    const result = await models.adminModel.findOne({
      where: {
        admin_email: email_id,
      },
    });

    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
// update admin detail
// 1->admin dashboard -> admin wants to update admin table
module.exports.updateAdminDetail = async (data) => {
  try {
    const [result] = await models.adminModel.update(
      {
        admin_name: data.admin_name,
        admin_phoneno: data.admin_phoneno,
        refresh_token: data.refresh_token,
      },
      {
        where: {
          admin_id: data.admin_id,
        },
      }
    );

    return result;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
// update refresh token
module.exports.updateAdminDetailRefreshToken = async (data) => {
  try {
    const [result] = await models.adminModel.update(
      {
        refresh_token: data.refresh_token,
      },
      {
        where: {
          admin_id: data.admin_id,
        },
      }
    );

    return result;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
// ***************************************
