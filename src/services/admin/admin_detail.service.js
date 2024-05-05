const models = require("../../models/index");

// get admin by id
// 1->admin dashboard -> admin profile
module.exports.getAdminById = async (id) => {
  try {
    const result = await models.adminModel.findOne({
      where: {
        admin_id: id,
      },
    });

    return result.dataValues;
  } catch (error) {
    console.error(error);
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
        admin_password: data.admin_password,
        admin_phoneno: data.admin_phoneno,
      },
      {
        where: {
          admin_id: data.admin_id,
        },
      }
    );

    return result;
  } catch (error) {
    console.error(error);
    return "FAILURE";
  }
};
// ***************************************
