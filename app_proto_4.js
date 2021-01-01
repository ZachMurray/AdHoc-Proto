import fs from 'fs';
let file = 'txnlog.dat';
console.log(file, typeof (file)); // File object.

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
    position = 9;
    console.log('Records', Records);
    while (position < data.length) {
      let Record = {};

      Record.TypeEnum = data.slice(position, position += 1).readInt8();
      switch (Record.TypeEnum) {
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
      let UserId = data.slice(position, position += 8).readBigUInt64BE(0, 8);
      if ([0, 1].includes(Record.TypeEnum)) {
        let AmountInDollars = data.slice(position, position += 8).readDoubleBE(0);
      }
    }
  });
}
decode();