const db = require("../../config/dbconfig");
const models = require("../../models/index");

// get all hotelowner
// 1->admin dashborad ->hotel/owners subsection
module.exports.getAllHotelOwner = async () => {
  try {
    const result = await models.hotelOwnerDetailModel.findAll();
    const dataValuesArray = result.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// get hotelowner by id
// 1-> hotelowner dashboard -> owner profile
module.exports.getHotelOwnerById = async (id) => {
  try {
    const result = await models.hotelOwnerDetailModel.findOne({
      where: { owner_id: id },
    });

    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// add new hotelowner
// 1-> hotelowner signup
module.exports.addNewHotelOwner = async (data) => {
  try {
    let result = await models.hotelOwnerDetailModel.create(data);

    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// delete hotelowner by id
// 1-> admin dashboard -> admin want to delete hotelowner
module.exports.deleteHotelOwnerById = async (id) => {
  try {
    const result = models.hotelOwnerDetailModel.destroy({
      where: { owner_id: id },
    });

    return result; // noofitems OR 0
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// update hotel owner by id
// 1-> hotelowner dashboard -> owner wants to update owner_detail
module.exports.updateHotelOwner = async (data) => {
  try {
    const [result] = await models.hotelOwnerDetailModel.update(
      {
        owner_name: data.owner_name,
        password: data.password,
        gender: data.gender,
        contact_no: data.contact_no,
        address: data.address,
      },
      {
        where: {
          owner_id: data.owner_id,
        },
      }
    );
    return result; //[noofrowsaffected]
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
