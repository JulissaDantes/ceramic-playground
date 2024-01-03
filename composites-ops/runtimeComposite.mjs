import { CeramicClient } from '@ceramicnetwork/http-client'
import { writeEncodedCompositeRuntime } from '@composedb/devtools-node'

// Replace by the URL of the Ceramic node you want to deploy the models to
const ceramic = new CeramicClient('http://localhost:7007')

// Replace by the path to the local encoded composite file
await writeEncodedCompositeRuntime(
  ceramic,
  './composedb-ops/my-first-composite-simnpleprofile-single.json',
  '__generated__/basic-profile-definition.js'
)

console.log("Success")