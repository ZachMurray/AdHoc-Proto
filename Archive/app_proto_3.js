import fs from 'fs';
const dataFile = new ArrayBuffer();
let file = 'txnlog.dat';

let decode = () => {
  console.log(file, typeof (file)); // File object.

  fs.readFile(file, (err, data) => {
    console.log(data.toString('utf8', 0, 4));
    console.log(data.toString('hex', 4, 5));
    console.log(data.toString('binary', 5, 9));

  });
}
decode();