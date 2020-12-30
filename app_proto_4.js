import fs from 'fs';
const dataFile = new ArrayBuffer();
let file = 'txnlog.dat';

let decode = () => {
  console.log(file, typeof (file)); // File object.

  fs.readFile(file, (err, data) => {
    let test = new Uint8Array(data.slice(0,4));
    let t = test.reduce(function (accumulator, currentValue) {
      return accumulator + String.fromCharCode(currentValue);
    }, ''); 
    console.log(t);

  });
}
decode();