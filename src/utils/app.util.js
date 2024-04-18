exports.getTimeStamp = function()
{
    let date = new Date();
    let strTimeStamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return strTimeStamp;
}

exports.getDateStamp = function()
{
    let date = new Date();
    let strDateStamp = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    return strDateStamp;
}