// Import ComposeDB client

import { ComposeClient }from '@composedb/client'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'

// Import your compiled composite

import { definition } from   '../__generated__/definition-updateTest.js'

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

// CREATING RECORDS
const create = true; // Update if you want to create something new

if (create) {
    const res = await compose.executeQuery(`
    mutation {
        createUpdateModel(input: {
            content: {
                name: "test m0ar"
            }
        }) 
        {
            document {
                name
              }
        }
      }
    `)
    
    console.log("Tests was ", res.data)
    /*
    await compose.executeQuery(`
    mutation {
        createGenericModel(input: {
            content: {
                numericalField: 26,
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
    `)  */      
}

// FILTERING RECORDS

const filter = true;
if (filter) {
  /*
    const resultFiltered = await compose.executeQuery(`
      query numericalFieldFiltered {
        genericModelIndex(first: 1, filters: { where: {numericalField: {equalTo: 2} } }) {
              edges {
            node {
                id
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
*/
    const expecting = await compose.executeQuery(`
    query {
        updateModelIndex(first:1) {
              edges {
            node {
                name
            }
          }
        }
      }
    `)

    console.log("Just looking", expecting);

}

// UPDATING RECORDS
const doUpdate = false

if (doUpdate) {
    const update = await compose.executeQuery(`
    mutation UpdateGenericModel {
        updateGenericModel(
          input: { 
            id: "kjzl6kcym7w8y7mjgp7tl2x69f1nonwhgymzju8aq8powcz5uvgh2xvt9n7unzn",
            content: {
              numericalField: 43,
              textField: "Sample Text truly r2",
              booleanField: true  # Make sure this line doesn't have an extra closing parenthesis
            }
          }
        ) {
          document {
            numericalField
            textField
            booleanField
          }
        }
      }
      
    `)
    console.log("What was returned:", update.data);

    const resultFiltered2 = await compose.executeQuery(`
    query {
        node (id: "kjzl6kcym7w8y7pobe7vnuidr4eauw6fdnhd98j9t9wumdhrqzi0748bo7hp4j5") {
          ... on GenericModel {
            id
            numericalField
            textField
            booleanField
          }
        }
      }
    `)
    console.log("just filtering updated record", resultFiltered2);
}