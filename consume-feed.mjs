import { EventSource  } from "cross-eventsource";
import { JsonAsString, AggregationDocument } from '@ceramicnetwork/codecs';
import { decode } from "codeco"

const source = new EventSource('http://localhost:7007/api/v0/feed/aggregation/documents')
const Codec = JsonAsString.pipe(AggregationDocument)

source.addEventListener('message', (event) => {
	console.log("escuche", event.data)
	const parsedData = decode(Codec, event.data)
	const streamID = parsedData.commitId.baseID
	console.log('parsed', streamID,":\n", parsedData)
})

source.addEventListener('error', error => {
	console.log('error', error)
})

console.log('listening...')
