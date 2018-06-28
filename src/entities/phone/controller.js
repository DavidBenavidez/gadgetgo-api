import Phone from './model';
import fonoapi from 'fonoapi-nodejs';
import request from 'request-promise';
import cheerio from 'cheerio';
import google from 'google';
import limitRequests from 'async-throttle';

fonoapi.token = '1da780c1a5c9bd7dec12ace6e83b326d88b6c8153649005e';
google.resultsPerPage = 25;

const brands = [{ "Brand": "Huawei" }, { "Brand": "Asus" }, { "Brand": "OnePlus" }, { "Brand": "Samsung" }, { "Brand": "Apple" }];
const gsmarena = 'gsmarena';
const phonearena = 'phonearena';
const checkBatteryDisplayCamera = (display, battery, camera) => {
  if (isNaN(display) || isNaN(battery) || camera === "Nope.") return false;
  return true;
}

/*
  What do you prioritize in a phone?
  Tough Battery!
  Gorgeous Display!
  Beautiful Camera!
  Just give me the best bang for my buck!
*/

const throttleRequests = limitRequests(1); // Limits requests made

export const addPhones = async (req, res) => {
  var phones = await Promise.all(
    brands.map(brand => {
      return new Promise((resolve, reject) => {
        fonoapi.getLatest(
          (qs, phones) => {
            phones = JSON.stringify(phones);
            resolve(JSON.parse(phones));
          },
          15,
          brand.Brand
        );
      })
    })
  );
  phones.map(brand => throttleRequests(async () => {
    brand.map(phone => throttleRequests(async () => {
      // Verify phone data
      var checkResolution = /(.*)(\()(~?)(\d+)(\s)(ppi)/;
      var ppi = checkResolution.exec(phone.resolution);
      ppi = ppi[4];

      var checkBattery = /(.*)(\s)(\d+)(\s)(mAh)/;
      var battery = checkBattery.exec(phone.battery_c);
      if (battery !== null) battery = battery[3];

      if (phone.primary === undefined) phone.primary = phone.primary_;
      if (phone.primary === undefined) phone.primary = "Nope.";
      else {
        phone.primary = phone.primary.split(" ");
        phone.primary = phone.primary[0];
      }
      if (checkBatteryDisplayCamera(ppi, battery, phone.primary)) { // Check if display or battery is a number
        google(gsmarena + " " + phone.DeviceName, async (err, res) => {
          if (err) {
            console.log(err);
          } else {
            const options = {
              uri: res.links[0].link,
              transform: function (body) {
                return cheerio.load(body);
              }
            }
            const $ = await request(options);
            var price = $('[data-spec=price]').text();
            var image = $('.specs-photo-main img').attr("src");
            price = price.split(' ');
            price = price[1];

            if (!isNaN(price)) { // Check if price is a number
              price = price * 62.56; // Euros to pesos 
              var newPhone = new Phone({
                brand: phone.Brand,
                model: phone.DeviceName,
                camera: phone.primary,
                display: ppi,
                battery: battery,
                price: price,
                link: res.links[0].link,
                image: image
              });
              newPhone.save();
              console.log("Added");
            } else console.log("Nope.");
          }
        });
      }
    }));
  }));
  return res.send({ "Ok": phones.length });
};

export const findByBudget = async (req, res) => {
  try {
    console.log("Price: " + req.query.price);
    Phone.find({ "price": { $lte: parseInt(req.query.price) } }, (err, phones) => {
      if (err) {
        res.send({});
      } else {
        res.send(phones);
      }
    }).sort({ "price": -1 }).limit(10);
  } catch (err) {
    const errors = [];
    for (let key in err.errors) {
      errors.push(err.errors[key].message);
    }
    res.status(500).json({ errors });
  }
};

export const findByBattery = async (req, res) => {
  try {
    console.log("Battery! " + req.query.price);
    Phone.find({ "price": { $lte: parseInt(req.query.price) } }, (err, phones) => {
      if (err) {
        res.send({});
      } else {
        res.send(phones);
      }
    }).sort({ "battery": -1 }).limit(10);
  } catch (err) {
    const errors = [];
    for (let key in err.errors) {
      errors.push(err.errors[key].message);
    }
    res.status(500).json({ errors });
  }
};

export const findByCamera = async (req, res) => {
  try {
    Phone.find({ "price": { $lte: parseInt(req.query.price) } }, (err, phones) => {
      if (err) {
        res.send({});
      } else {
        var sortedArray = [];
        for (var i = 0; i < phones.length; i++) {
          if (phones[i].camera === "Dual:") {
            sortedArray.push(phones[i]);
            phones.splice(i, 1);
            i--;
          }
        }

        phones.sort(function (a, b) {
          var keyA = new Date(a.camera),
            keyB = new Date(b.camera);
          // Compare the 2 dates
          if (keyA > keyB) return 1;
          if (keyA < keyB) return -1;
          return 0;
        });
        for (var i = 0; i < phones.length; i++) sortedArray.push(phones[i]);
        res.send(sortedArray);
      }
    }).limit(10);
  } catch (err) {
    const errors = [];
    for (let key in err.errors) {
      errors.push(err.errors[key].message);
    }
    res.status(500).json({ errors });
  }
};

export const findByDisplay = async (req, res) => {
  try {
    Phone.find({ "price": { $lte: parseInt(req.query.price) } }, (err, phones) => {
      if (err) {
        res.send({});
      } else {
        res.send(phones);
      }
    }).sort({ "display": -1 }).limit(10);
  } catch (err) {
    const errors = [];
    for (let key in err.errors) {
      errors.push(err.errors[key].message);
    }
    res.status(500).json({ errors });
  }
};

export const clearPhones = (req, res) => {
  try {
    Phone.remove({}, (err, phones) => {
      if (err) {
        res.send({});
      } else {
        res.send(phones)
      }
    });
  } catch (err) {
    const errors = [];
    for (let key in err.errors) {
      errors.push(err.errors[key].message);
    }
    res.status(500).json({ errors });
  }
}