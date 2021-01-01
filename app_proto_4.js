import fs from 'fs';
let file = 'txnlog.dat';
console.log(file, typeof (file)); // File object.

function decode() {
  fs.readFile(file, (_err, data) => {
    let t = new Uint8Array(data.slice(0, 4))
      .reduce(
        (accumulator, currentValue) => accumulator + String.fromCharCode(currentValue),
        ''
      );
    console.log(t);

    let version = data.slice(4, 5).readInt8();
    console.log('version', version);

    let NumberOfRecords = data.slice(5, 9).readUIntBE(0, 4);
    console.log('NumberOfRecords', NumberOfRecords);

    console.log('data.length', data.length);
    let position = 9;
    while (position < data.length) {
      let Record = {};

      let RecordTypeEnum = data.slice(position, ++position).readInt8();
      console.log('RecordTypeEnum', RecordTypeEnum);
      switch (RecordTypeEnum) {
        case 0:
          Record.recordType = 'Debit';
          break;
        case 1:
          Record.recordType = 'Credit';
          break;
        case 2:
          Record.recordType = 'StartAutopay';
          break;
        case 3:
          Record.recordType = 'EndAutopay';
          break;
        default:
          Record.recordType = '';
          break;
      }

      let UnixTimeStamp = data.slice(position, position += 4).readIntBE(0, 4);
      console.log('UnixTimeStamp', UnixTimeStamp);

      let UserId = data.slice(position, position += 8).readBigUInt64BE(0, 8);
      console.log('UserId', UserId);

      if ([0, 1].includes(RecordTypeEnum)) {
        let temp = data.slice(22, 30);
        console.log('temp', temp);
        let AmountInDollars = data.slice(position, position += 8).readFloatBE(0);
        console.log('AmountInDollars', AmountInDollars);
      }
      console.log('position', position)
    }
  });
}
decode();