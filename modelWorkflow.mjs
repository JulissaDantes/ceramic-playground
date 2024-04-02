import { CeramicClient } from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';
import { createComposite, writeEncodedComposite, writeEncodedCompositeRuntime } from '@composedb/devtools-node';

const name = 'post-comment-like'
const modelFile = name + ".graphql";
const compositeFile = "my-composite-" + name + ".json";
const definitionFile = "__generated__/definition-" + name + ".js";
const seed = new Uint8Array([//Random numbers
    192,  16, 89, 183,  66, 111,  35,  98,
    211, 155, 35, 149, 177, 242, 119,  55,
    202,  79, 94, 168, 106,  74,  17,  10,
    116, 105, 77, 116, 161, 176,  81, 189
  ]);// TO BE REPLACE with actual admin DID seed

const provider = new Ed25519Provider(seed);
const did = new DID({ provider, resolver: getResolver() });

await did.authenticate();

const ceramic = new CeramicClient('http://0.0.0.0:7007');
// An authenticated DID with admin access must be set on the Ceramic instance
ceramic.did = did;
console.log("did was authenticated", ceramic.did, './models/' + modelFile);
const composite = await createComposite(ceramic, './models/' + modelFile);
console.log("Created composite for model");
await writeEncodedComposite(composite, './' + compositeFile);
console.log("Created encoded composite")
await writeEncodedCompositeRuntime(
    ceramic,
    compositeFile,
    definitionFile
)
console.log("Deployed composite")
console.log("SUCCESS ");
