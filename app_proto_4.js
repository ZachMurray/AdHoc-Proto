import fs from 'fs';
let file = 'txnlog.dat';

function decode() {
  let Records = {};
  fs.readFile(file, (_err, data) => {
    let position = 0;
    Records.Name = new Uint8Array(data.slice(position, position += 4))
      .reduce(
        (accumulator, currentValue) => accumulator + String.fromCharCode(currentValue),
        ''
      );
    Records.Version = data.slice(position, position += 1).readInt8();
    Records.Total = data.slice(position, position += 4).readUIntBE(0, 4);
    let RecordTypeEnum, Record;
    while (position < data.length) {
      Record = {};
      RecordTypeEnum = data.slice(position, position += 1).readInt8();
      switch (RecordTypeEnum) {
        case 0:
          Record.Type = 'Debit';
          break;
        case 1:
          Record.Type = 'Credit';
          break;
        case 2:
          Record.Type = 'StartAutopay';
          break;
        case 3:
          Record.Type = 'EndAutopay';
          break;
        default:
          Record.Type = '';
          break;
      }

      Record.UnixTimeStamp = data.slice(position, position += 4).readIntBE(0, 4);
      Record.UserId = data.slice(position, position += 8).readBigUInt64BE(0, 8);
      if ([0, 1].includes(RecordTypeEnum)) {
        Record.AmountInDollars = data.slice(position, position += 8).readDoubleBE(0);
      }
      console.log('Record', Record);
    }
  });
}
decode();