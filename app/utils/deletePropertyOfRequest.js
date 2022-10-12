const deleteEmptyValuesOfRequest = function (data, blackList = [[]]) {
  Object.keys(data).forEach((key, value) => {
    if (blackList.includes(data[key])) delete data[key];
  });
};

const deletePropertyOfRequest = function (data, blackList = []) {
  Object.keys(data).forEach((key, value) => {
    if (blackList.includes(key)) delete data[key];
  });
};

module.exports = {
  deletePropertyOfRequest,
  deleteEmptyValuesOfRequest,
};
