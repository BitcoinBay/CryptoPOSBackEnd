const EthWallet = require('ethereumjs-wallet');
const HDKey = require('ethereumjs-wallet/hdkey');
const BITBOXSDK = require('@chris.troutner/bitbox-js');

const BITBOX = new BITBOXSDK({ restURL: `https://rest.bitcoin.com/v2/`});

const bchPath = "m/44'/0'/0'";
const testPath = "m/44'/1'/0'";
const btcPath = "m/44'/0'/0'";
const ethPath = "m/44'/60'/0'";
const NETWORK = "mainnet";

async function main() {
  //const mnemonic = BITBOX.Mnemonic.generate(128, BITBOX.Mnemonic.wordLists()["english"]);
  // manually input mnemonic below
  // let words = "penalty box theory hundred want unhappy inhale close lock hollow vital spawn";
  let words = "vocal alley sphere depart pipe glad skate strong sand pear desert fence lecture announce arrest warrior inform vacant tonight salute maid similar loop gap"

  // let rootSeed;
  // if (words === "") {
  //   rootSeed = await BITBOX.Mnemonic.toSeed(mnemonic);
  //   console.log(mnemonic);
  //   console.log(rootSeed);
  // } else {
    let rootSeed = await BITBOX.Mnemonic.toSeed(words);
    console.log(words);
    console.log(rootSeed);
  // }

  const bchMasterHDNode = BITBOX.HDNode.fromSeed(rootSeed);
  const testMasterHDNode = BITBOX.HDNode.fromSeed(rootSeed, "testnet");

  const btcAccount = BITBOX.HDNode.derivePath(bchMasterHDNode, btcPath);
  const btcXPub = BITBOX.HDNode.toXPub(btcAccount);
  console.log(`BTC XPub ${btcPath}: `, btcXPub);

  const bchAccount = BITBOX.HDNode.derivePath(bchMasterHDNode, bchPath);
  const bchXPub = BITBOX.HDNode.toXPub(bchAccount);
  console.log(`BCH XPub ${bchPath}: `, bchXPub);

  const testAccount = BITBOX.HDNode.derivePath(testMasterHDNode, testPath);
  const testXPub = BITBOX.HDNode.toXPub(testAccount);
  console.log(`TSN XPub ${testPath}: `, testXPub);

  const ethMasterHDNode = HDKey.fromMasterSeed(rootSeed);
  const ethAccount = ethMasterHDNode.derivePath(ethPath);
  const ethXPub = ethAccount.publicExtendedKey();
  const walletPub = HDKey.fromExtendedKey(ethXPub);
  console.log(`ETH XPub ${ethPath}: `, ethXPub);

  for (let i = 0; i < 10; i++) {
      let cashAddrBCH = BITBOX.Address.fromXPub(bchXPub, `0/${i}`);
      let addressBTC = BITBOX.Address.fromXPub(btcXPub, `0/${i}`);
      let legacyAddrBTC = BITBOX.Address.toLegacyAddress(addressBTC);
      let testAddrBCH = BITBOX.Address.fromXPub(testXPub, `0/${i}`);
      let addressETH = walletPub.deriveChild(i).getWallet().getAddressString();
      console.log(`BTC Address ${i+1}: `, legacyAddrBTC);
      console.log(`BCH Address ${i+1}: `, cashAddrBCH);
      console.log(`TSN Address ${i+1}: `, testAddrBCH);
      console.log(`ETH Address ${i+1}: `, addressETH, "\n");
  }
}

main();
