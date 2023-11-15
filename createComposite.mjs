import { CeramicClient } from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';

// Import the devtool node package
import { createComposite, writeEncodedComposite } from '@composedb/devtools-node';

const seed = new Uint8Array([
    192,  16, 89, 183,  66, 111,  35,  98,
    211, 155, 35, 149, 177, 242, 119,  55,
    202,  79, 94, 168, 106,  74,  17,   0,
    116, 105, 77, 116, 161, 176,  81, 189
  ]);
const provider = new Ed25519Provider(seed);
const did = new DID({ provider, resolver: getResolver() });

await did.authenticate();

// Replace by the URL of the Ceramic node you want to deploy the Models to
const ceramic = new CeramicClient('http://localhost:7007');
// An authenticated DID with admin access must be set on the Ceramic instance
ceramic.did = did;

// Replace by the path to the source schema file
const composite = await createComposite(ceramic, './models/my-test-schema.graphql');
console.log("1");
// Replace by the path to the encoded composite file
await writeEncodedComposite(composite, './my-composite.json');console.log("1");