const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const { QueryTypes } = require("sequelize");
const axios = require("axios");
const ShortUrl = require("../models/shortUrl-model");
const ClientLocation = require("../models/client-location-model");
const { GenerateUniqueHex, isLinkExpired } = require("../utils/utility");

exports.postShortURL = async (req, res) => {
  let url = {
    longUrl: req.body.longUrl,
    shortUrl: await GenerateUniqueHex(5),
    clicks: 0,
  };

  ShortUrl.create(url)
    .then((data) => {
      //console.log("1 record inserted successfully");
      return res.json(url);
    })
    .catch((err) => {
      res.json({ errorFlag: "Y", error: err.message });
    });
};

exports.getAccessByShortURL = async (req, res, next) => {
  const shortUrl = await ShortUrl.findOne({
    where: { shorturl: req.params.short },
  });
  if (shortUrl == null) res.sendStatus(404);

  if (isLinkExpired(shortUrl.getDataValue("createdAt")))
    return res.sendStatus(404);

  axios
    .get("https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3")
    .then((data) => data.data)
    .then((data) => {
      // shortUrl.clicks++;
      // shortUrl.save();

      let clientLocation = {
        shorturlId: shortUrl.id,
        country_code: data.country_code,
        country_name: data.country_name,
        city: data.city,
        postal: data.postal,
        ipv4: data.IPv4,
        state: data.state,
      };

      ClientLocation.create(clientLocation)
        .then((d) => {
          shortUrl.clicks++;
          shortUrl.save();
          res.redirect(shortUrl.longUrl);
        })
        .catch((err) => {
          res.json({ errorFlag: "Y", error: err.message });
        });
    })
    .catch((err) => {
      res.json({ errorFlag: "Y", error: err.message });
    });
};

exports.getUrls = async (req, res, next) => {
  let stats = [];

  let response = await ShortUrl.findAll()
    .then((result) => {
      result.map((item) => {
        let x = item.toJSON();

        GetTopCountries(x.id, (countries) => {
          let finalData = {
            id: x.id,
            longUrl: x.longUrl,
            shortUrl: x.shortUrl,
            clicks: x.clicks,
            createdAt: x.createdAt,
            updatedAt: x.updatedAt,
            topCountries: countries,
          };
          stats.push(finalData);
        });
      });
      setTimeout(() => {
        res.json(stats);
      }, 500);
    })
    .catch((err2) => {
      res.json({ errorFlag: "Y", error: err.message });
    });
};

const GetTopCountries = (id, cb) => {
  let sql =
    "SELECT `country_name` FROM `shorturldb`.`clientlocations` where `clientlocations`.`shorturlId` = " +
    id +
    " group by `country_name` order by count(`country_name`) desc limit 0,3";

  let names = sequelize
    .query(sql, { type: QueryTypes.SELECT })
    .then((item) => {
      const d = item.map((v) => {
        return v.country_name;
      });
      cb(d.join());
    })
    .catch((err) => {
      cb("");
    });
};
