import { CeramicClient } from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';

// Import the devtool node package
import { createComposite, writeEncodedComposite } from '@composedb/devtools-node';

const seed = new Uint8Array([157, 243, 44, 109, 192, 15, 72, 51, 96, 235, 41, 250, 4, 164, 114, 243, 44, 109, 192, 15, 72, 51, 96, 235, 41, 250, 4, 164, 15, 72, 51, 96]);
const provider = new Ed25519Provider(seed);
const did = new DID({ provider, resolver: getResolver() });

await did.authenticate();

// Replace by the URL of the Ceramic node you want to deploy the Models to
const ceramic = new CeramicClient('http://localhost:7007');
// An authenticated DID with admin access must be set on the Ceramic instance
ceramic.did = did;

// Replace by the path to the source schema file
const composite = await createComposite(ceramic, './models/my_schema.graphql');

// Replace by the path to the encoded composite file
await writeEncodedComposite(composite, './my-composite.json');