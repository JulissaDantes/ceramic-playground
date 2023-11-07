import { CeramicClient } from '@ceramicnetwork/http-client'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'

const ceramic = new CeramicClient()

// `seed` must be a 32-byte long Uint8Array
async function authenticateCeramic(seed) {
  const provider = new Ed25519Provider(seed)
  const did = new DID({ provider, resolver: getResolver() })
  // Authenticate the DID with the provider
  await did.authenticate()
  // The Ceramic client can create and update streams using the authenticated DID
  ceramic.did = did
  return did.id;
}

async function createDocument(content, id) {
  // The following call will fail if the Ceramic instance does not have an authenticated DID
  const doc = await TileDocument.create(ceramic, content)
  // The stream ID of the created document can then be accessed as the `id` property
  return doc.id
}

async function updateDocument(id, content) {
  // First, we need to load the document
  const doc = await TileDocument.load(ceramic, id)
  // The following call will fail if the Ceramic instance does not have an authenticated DID
  await doc.update(content)
}

const seedArg = new Uint8Array([157, 243, 44, 109, 192, 15, 72, 51, 96, 235, 41, 250, 4, 164, 114, 243, 44, 109, 192, 15, 72, 51, 96, 235, 41, 250, 4, 164, 15, 72, 51, 96]);
const idArg = await authenticateCeramic(seedArg);
console.log("The new key", idArg);
const docID = await createDocument(null, idArg.toString());
console.log(docID);
await updateDocument(docID, "The updated value")
console.log("SUCCESS");