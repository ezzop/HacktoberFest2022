const EC= require('elliptic').ec;
const ec= new EC('secp256k1');

const key= ec.genKeyPair();
//generate a hexadecimal public key
const publicKey= key.getPublic('hex');
//generate a hexadecimal private key
const privateKey= key.getPrivate('hex');

console.log();
console.log('Private key:', privateKey);

console.log();
console.log('Public key:', publicKey);