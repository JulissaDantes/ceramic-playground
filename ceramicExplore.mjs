import { CeramicClient } from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';

const seed = new Uint8Array([//Random numbers
    192,  16, 89, 183,  66, 111,  35,  98,
    211, 155, 35, 149, 177, 242, 119,  55,
    202,  79, 94, 168, 106,  74,  17,  10,
    116, 105, 77, 116, 161, 176,  81, 189
  ]);// TO BE REPLACE with actual admin DID seed

const provider = new Ed25519Provider(seed);
const did = new DID({ provider, resolver: getResolver() });

await did.authenticate();

const ceramic = new CeramicClient('https://ceramic-dev.3boxlabs.com');//https://ceramic-dev.3boxlabs.com http://localhost:7007

ceramic.did = did;

/*const varlu = (await ceramic.admin.getIndexedModelData())[0].streamID.toString()

console.log("Esto devolvio", varlu === "kjzl6hvfrbw6c72iuc4yvb95lpvviqwjdheejn5tmx714p0owsbe52zmcmonjq7");*/
console.log("sdfsd");