import fs from 'fs';

fs.open('txnlog.dat', 'r', function (status, fd) {
  if (status) {
    console.log(status.message);
    return;
  }
  var buffer = Buffer.alloc(100);
  fs.read(fd, buffer, 0, 100, 0, function (err, num) {
    console.log(buffer.toString('utf8', 0, num));
  });
});

const binary = fs.readFileSync('./txnlog.dat');
process.stdout.write(binary.slice(0, 48));