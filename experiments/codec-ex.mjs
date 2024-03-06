
import { JsonAsString, AggregationDocument } from '@ceramicnetwork/codecs';
import { decode } from "codeco"

const uint8Array = new Uint8Array([157, 243,  44, 109, 192,  15,  72,  51,  96, 235,  41, 250,   4, 164, 114,  23,  44, 109, 192,  15,  72,  51,  96, 235,  41, 250,   4, 164,  15,  72,  51,  96]);

const data = JSON.stringify({
  "commitId": "k6zn3t2py84tmzmkq96fhp0oankollbs6vxvkhkfcym96he8ayqrjnqe9lm9zm428gd85t2t1spob2a8iwwta2vf6e1snuuusygjyda0ccv2uj2gyn7x9rd",
  "content": "{\"name\":\"Card86\",\"views\":{\"account\":{\"type\":\"documentAccount\"},\"resource\":{\"type\":\"relationDocument\",\"model\":\"kjzl6hvfrbw6c8iyosnyn1gh7srmyhzxtwxnaxmiu1v0hhw8w6wgytoofjpg301\",\"property\":\"resourceId\"}},\"schema\":{\"type\":\"object\",\"$defs\":{\"CeramicStreamID\":{\"type\":\"string\",\"title\":\"CeramicStreamID\",\"maxLength\":100},\"GraphQLDateTime\":{\"type\":\"string\",\"title\":\"GraphQLDateTime\",\"format\":\"date-time\",\"maxLength\":100}},\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"properties\":{\"url\":{\"type\":\"string\",\"maxLength\":140,\"minLength\":1},\"cid17\":{\"type\":\"string\",\"maxLength\":3000,\"minLength\":1},\"quote\":{\"type\":\"string\",\"maxLength\":10000,\"minLength\":1},\"altText\":{\"type\":\"string\",\"maxLength\":3000,\"minLength\":1},\"deleted\":{\"type\":\"boolean\"},\"pinSize\":{\"type\":\"integer\"},\"mimeType\":{\"type\":\"string\",\"maxLength\":140,\"minLength\":1},\"createdAt\":{\"$ref\":\"#/$defs/GraphQLDateTime\"},\"pinSize64\":{\"type\":\"integer\"},\"updatedAt\":{\"$ref\":\"#/$defs/GraphQLDateTime\"},\"videoTime\":{\"type\":\"string\",\"maxLength\":300,\"minLength\":1},\"annotation\":{\"type\":\"string\",\"maxLength\":10000,\"minLength\":1},\"resourceId\":{\"$ref\":\"#/$defs/CeramicStreamID\"},\"pageYOffset\":{\"type\":\"number\"},\"scrollHeight\":{\"type\":\"number\"}},\"additionalProperties\":false},\"version\":\"1.0\",\"relations\":{\"resourceId\":{\"type\":\"document\",\"model\":\"kjzl6hvfrbw6c8iyosnyn1gh7srmyhzxtwxnaxmiu1v0hhw8w6wgytoofjpg301\"}},\"description\":\"Blocks of text for Idealite\",\"accountRelation\":{\"type\":\"list\"}}",
  "metadata": {
    "controllers": ["did:key:z6MknE3RuK7XU2W1KGCQrsSVhzRwCUJ9uMb6ugwbELm9JdP6"],
    "model": "kh4q0ozorrgaq2mezktnrmdwleo1d"
  },
  "eventType": 2
}
)
const Codec = JsonAsString.pipe(AggregationDocument)

const parsedData = decode(Codec, data)
const streamID = parsedData.commitId.baseID
console.log('parsed', streamID,":\n", parsedData)

// now lets encode it
parsedData.metadata.model = uint8Array

const serializeFn = JsonAsString.pipe(AggregationDocument).encode
const newData = `data: ${serializeFn(parsedData)}\n\n`

console.log('listening...', parsedData, newData)
