// Import ComposeDB client

import { ComposeClient }from '@composedb/client'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'

// Import your compiled composite

import { definition } from   './__generated__/definition.js'

// Create an instance of ComposeClient
// Pass the URL of your Ceramic server
// Pass reference to your compiled composite

const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })
const seed = new Uint8Array([157, 243, 44, 109, 192, 15, 72, 51, 96, 235, 41, 250, 4, 164, 114, 23, 44, 109, 192, 15, 72, 51, 96, 235, 41, 250, 4, 164, 15, 72, 51, 96]);//Random bytes
const provider = new Ed25519Provider(seed)
const did = new DID({ provider, resolver: getResolver() })
  // Authenticate the DID with the provider
await did.authenticate()
// Allow did to perform mutations
compose.setDID(did)

console.log(compose,"ITS ALIVEEEE");
// CREATING RECORDS
await compose.executeQuery(`
mutation {
    createGenericModel(input: {
        content: {
            numericalField: 42,
            textField: "Sample Text",
            booleanField: true
        }
    }) 
    {
        document {
            numericalField
            textField
            booleanField
          }
    }
  }
`)

await compose.executeQuery(`
mutation {
    createGenericModel(input: {
        content: {
            numericalField: 2,
            textField: "Sample Text 2",
            booleanField: false
        }
    }) 
    {
        document {
            numericalField
            textField
            booleanField
          }
    }
  }
`)

// FILTERING RECORDS
const resultFiltered = await compose.executeQuery(`
  query numericalFieldFiltered {
    genericModelIndex(first: 1, filters: { where: {numericalField: {equalTo: 42} } }) {
          edges {
        node {
            numericalField
            textField
            booleanField
        }
      }
    }
  }
`)
console.log("just filtering", resultFiltered.data.genericModelIndex.edges);

const result = await compose.executeQuery(`
query {
    genericModelIndex(first:1) {
          edges {
        node {
            numericalField
            textField
            booleanField
        }
      }
    }
  }
`)
const { data } = result;
console.log("Just looking", data.genericModelIndex.edges);

// UPDATING RECORDS
/*
const update = await compose.executeQuery(`
mutation UpdateGenericModel {
    updateGenericModel(id: kjzl6hvfrbw6cafi0e0i3c21axdp4qtpzc96buz5o2qd7c41v86pi3b1hmds0hv, input: {
        content: {
          numericalField: 42,
          textField: "Sample Text",
          booleanField: true
        }) {
      document {
        numericalField
        textField
        booleanField : false
      }
    }
  }
`)
console.log(update);*/