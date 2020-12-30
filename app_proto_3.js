import fs from 'fs';
const reader = new FileReader();
const dataFile = new ArrayBuffer();
let file = 'txnlog.dat';

fs.readFile(file, 'binary' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})