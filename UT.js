const { deterministicPartitionKey } = require('./app');
const crypto = require('crypto');

//UnitTest
const Event={}
result=deterministicPartitionKey(null)
console.log(result)
if (result === '0'){
    console.log("pass1")
}
else{"fail"};

const event1 = { partitionKey: 'my-partition-key' };
result=deterministicPartitionKey(event1)
//console.log(result)
if (result ==="my-partition-key"){
    console.log("pass2")
}
else{"fail"};



newEvent={key:"dsakj"}
const event2 = { id: '123', name: 'Test Event' };
result=deterministicPartitionKey(event2)
//console.log(result)
if (result ===  crypto.createHash('sha3-512').update(JSON.stringify(event2)).digest('hex')){
    console.log("pass3")
}
else{"fail"};
