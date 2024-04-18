const db = require('../database/db');

// get all users
// 1->admin dashborad ->user section
module.exports.getAllUser = async () => {
    let queryGetAllUser = "SELECT * FROM user_detail";
    let [allUser] = await db.query(queryGetAllUser);
    return allUser;
  };





























// exports.getDepartmentById= async (dno) => {
//     let [deptArray] = await db.query("select * from dept where deptno=" + dno); 
//     return deptArray[0];
// };

// exports.deleteDeptById= async (dno) => {
//     // logic
//     let [deptArray] = await db.query("delete from dept where deptno="+dno);
//     return deptArray[0];
// };

// exports.addDept= async (deptObj) => {
//     // logic
//     let [deptArray] = await db.query("INSERT INTO dept SET ?", [deptObj]);
//     return deptArray[0];
// };

