const { randomBytes } = require("crypto");
const ShortUrl = require("../models/shortUrl-model");

exports.GenerateUniqueHex = async (len) => {
  let existingValues;
  await ShortUrl.findAll()
    .then((res) => {
      existingValues = res.map((item) => {
        return item.getDataValue("shortUrl");
      });
    })
    .catch((err) => {
      console.log({ errorFlag: "Y", error: err.message });
    });

  let shortId = new Set(existingValues);
  let size = shortId.size;
  let newId;

  do {
    newId = randomBytes(Math.ceil(len / 2))
      .toString("hex")
      .substr(0, len);
    shortId.add(newId);
  } while (shortId.size === size);
  return newId;
};

exports.isLinkExpired = (createdAt) => {
  var date1 = new Date();
  var date2 = new Date(createdAt);

  // To calculate the time difference of two dates
  var Difference_In_Time = date1.getTime() - date2.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  if (Difference_In_Days > 30) {
    return true;
  } else {
    return false;
  }
};
