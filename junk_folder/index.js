const EthWallet = require('ethereumjs-wallet');
const HDKey = require('ethereumjs-wallet/hdkey');
const BITBOXSDK = require('@chris.troutner/bitbox-js');

const BITBOX = new BITBOXSDK({ restURL: `https://trest.bitcoin.com/v2/`});

const mnemonic = BITBOX.Mnemonic.generate(128, BITBOX.Mnemonic.wordLists()["english"]);
let words = "talk story visual hidden behind wasp evil abandon bus brand circle sketch";

console.log("Mnemonic: ", mnemonic);

const bchPath = "m/44'/1'/0'";
const btcPath = "m/44'/0'/0'";
const ethPath = "m/44'/60'/0'/0";

const rootSeed = BITBOX.Mnemonic.toSeed(words);
console.log(rootSeed);

const bchMasterHDNode = BITBOX.HDNode.fromSeed(rootSeed);

const btcAccount = BITBOX.HDNode.derivePath(bchMasterHDNode, btcPath);
const btcXPub = BITBOX.HDNode.toXPub(btcAccount);
console.log("BTC XPub: ", btcXPub);

const bchAccount = BITBOX.HDNode.derivePath(bchMasterHDNode, bchPath);
const bchXPub = BITBOX.HDNode.toXPub(bchAccount);
console.log("BCH XPub: ", bchXPub);

const ethMasterHDNode = HDKey.fromMasterSeed(rootSeed);
const ethAccount = ethMasterHDNode.derivePath(ethPath);
const ethXPub = ethAccount.publicExtendedKey();
const walletPub = HDKey.fromExtendedKey(ethXPub);
console.log("ETH XPub: ", ethXPub);

for (let i = 0; i < 10; i++) {
    let cashAddrBCH = BITBOX.Address.fromXPub(bchXPub, `0/${i+20}`);
    let addressBTC = BITBOX.Address.fromXPub(btcXPub, `0/${i}`);

    let legacyAddrBTC = BITBOX.Address.toLegacyAddress(addressBTC);
    let addressETH = walletPub.deriveChild(i).getWallet().getAddressString();
    console.log(`BCH Address ${i+1}: `, cashAddrBCH);
    console.log(`BTC Address ${i+1}: `, legacyAddrBTC);
    console.log(`ETH Address ${i+1}: `, addressETH, "\n");
}
