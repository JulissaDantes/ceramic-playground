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

const ceramic = new CeramicClient('http://localhost:7007');//https://ceramic-dev.3boxlabs.com http://localhost:7007

ceramic.did = did;

const streamIds = await ceramic.admin.pin.ls()

console.log("This is pinned ", streamIds)

// unpin this http://localhost:7007
const streamId = 'k2t6wyfsu4pfxus4m4c932u9jbma18ajizbhdb4nrn6011pboh0x7igbc93ht6'
await ceramic.admin.pin.rm(streamId)// this trowed the wrong message here TODO PR

console.log("Deleted the pin, now let's see if its still there")

console.log("This is pinned ", await ceramic.admin.pin.ls())