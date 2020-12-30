import fs from 'fs';

fs.readFile('txnlog.dat', 'binary' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})