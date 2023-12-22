// Import ComposeDB client

import { ComposeClient }from '@composedb/client'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'

// Import your compiled composite

import { definition } from   '../__generated__/set-definition.js'

// Create an instance of ComposeClient
// Pass the URL of your Ceramic server
// Pass reference to your compiled composite

const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })
const compose2 = new ComposeClient({ ceramic: 'http://localhost:7007', definition })
const seed = new Uint8Array([//Random numbers
    192,  16, 89, 183,  66, 111,  35,  98,
    211, 155, 35, 149, 177, 242, 119,  55,
    202,  79, 94, 168, 106,  74,  17,  10,
    116, 105, 77, 116, 161, 176,  81, 189
  ]);
const seed2 = new Uint8Array([//Random numbers
192,  16, 99, 183,  66, 111,  35,  98,
211, 155, 35, 149, 177, 242, 119,  55,
202,  79, 94, 168, 106,  74,  17,  10,
116, 105, 77, 116, 161, 176,  81, 189
]);
const provider = new Ed25519Provider(seed)
const provider2 = new Ed25519Provider(seed2)

const did = new DID({ provider, resolver: getResolver() })
const did2 = new DID({ provider: provider2, resolver: getResolver() })
// Authenticate the DID with the provider
await did.authenticate()
await did2.authenticate()
// Allow did to perform mutations
compose.setDID(did)
compose2.setDID(did2)

//Create Basic Profile twice
const profile1 = await compose.executeQuery(`
mutation {
    createBasicProfile(input: {
      content: {
        name: "profile1.name"
        username: "profile1.username"
        description: "profile1.description"
        gender: "FEM"
        emoji: "ok"
      }
    }) 
    {
      document {
        name
        username
        description
        gender
        emoji
      }
    }
  }
    `)
    
const profile2 = await compose2.executeQuery(`
mutation {
    createBasicProfile(input: {
      content: {
        name: "profile2.name"
        username: "profile2.username"
        description: "profile2.description"
        gender: "MAS"
        emoji: "ok"
      }
    }) 
    {
      document {
        name
        username
        description
        gender
        emoji
      }
    }
  }
    `)

console.log("profile 1:", profile1)
console.log("profile 2:", profile2)
// follow p1 from p2

// try to follow p1 from p2 again and expect a clash