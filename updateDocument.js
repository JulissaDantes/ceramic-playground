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
}

async function updateDocument(id, content) {
  // First, we need to load the document
  const doc = await TileDocument.load(ceramic, id)
  // The following call will fail if the Ceramic instance does not have an authenticated DID
  await doc.update(content)
}

