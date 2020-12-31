import fs from 'fs';
const dataFile = new ArrayBuffer();
let file = 'txnlog.dat';

let decode = () => {
  console.log(file, typeof (file)); // File object.

  fs.readFile(file, (err, data) => {
    let test = new Uint8Array(data.slice(0, 4));
    let t = test.reduce(function (accumulator, currentValue) {
      return accumulator + String.fromCharCode(currentValue);
    }, '');
    console.log(t);

    let version = data.slice(4, 5).readInt8();
    console.log('version', version); // 1

    let NumberOfRecords = data.slice(5, 9).readUIntBE(0, 4);
    console.log('NumberOfRecords', NumberOfRecords);

    let record = {};

    let RecordTypeEnum = data.slice(9, 10).readInt8();
    console.log('RecordTypeEnum', RecordTypeEnum);
    switch (RecordTypeEnum) {
      case 0:
        record.recordType = 'Debit';
        break;
      case 1:
        record.recordType = 'Credit';
        break;
      case 2:
        record.recordType = 'StartAutopay';
        break;
      case 3:
        record.recordType = 'EndAutopay';
        break;
      default:
        record.recordType = 'Other';
        break;
    }

    let UnixTimeStamp = data.slice(10, 14).readIntBE(0, 4);
    console.log('UnixTimeStamp', UnixTimeStamp);

    let UserId = data.slice(14, 22).readBigUInt64BE(0, 8).toLocaleString();
    console.log('UserId', UserId);

    if ([0, 1].includes(RecordTypeEnum)) {
      
    }

  });
}
decode();