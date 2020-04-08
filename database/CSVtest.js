const faker = require('faker');
const fs = require('fs');

const writeApps = fs.createWriteStream('test.csv');
writeApps.write('id,name,author,imageUrl,category,updatedAt,size,editorChoice,rating,ratings,currentVersion,installs\n', 'utf8');

var categories = ['Social', 'Games', 'Finance', 'Lifestyle', 'Productivity'];
var writeTenMillionApps = function (writer, encoding, cb) {
  var blip = '=';
  var statusBar = '>-------------------';
  var percentage = 0;
  var status = '';
  let i = 100;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      if (i % 100000 === 0) {
        percentage += 1;
        status = statusBar + ' | ' + percentage + '%';
        console.log(status);
        if (i % 500000 === 0) {
          statusBar = statusBar.slice(0, -1);
          statusBar = blip.concat(statusBar);
          status = statusBar + ' | ' + percentage + '%';
          console.log(status);
        }
      }
      var randomIndex = Math.floor((Math.random() * 5));
      var randomPicId = Math.floor((Math.random() * 1000) + 1);
      var randomVersion = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
      var randomRating = (Math.floor((Math.random() * 10) + 1)) / 2;
      const name = faker.commerce.product();
      const author = faker.name.firstName() + ' ' + faker.name.lastName();
      const imageUrl = `https://sdc-team-navi-b3.s3-us-west-1.amazonaws.com/img/${randomPicId}.jpg`;
      const category = categories[randomIndex];
      const updatedAt = faker.date.past();
      const size = faker.random.number() + 'MB';
      const editorChoice = faker.random.boolean();
      const rating = randomRating;
      const ratings = faker.random.number();
      const currentVersion = randomVersion;
      const installs = faker.random.number();
      let data = ``;
      if (i === 0) {
        data = `${id},${name},${author},${imageUrl}, ${category},${updatedAt},${size},${editorChoice},${rating},${ratings},${currentVersion},${installs}`;
      } else {
        data = `${id},${name},${author},${imageUrl}, ${category},${updatedAt},${size},${editorChoice},${rating},${ratings},${currentVersion},${installs}\n `;
      }
      if (i === 0) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

writeTenMillionApps(writeApps, 'utf-8', () => {
  writeApps.end();
});