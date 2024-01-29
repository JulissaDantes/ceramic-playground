import { JsonAsString } from "@ceramicnetwork/codecs";

// Example usage
const jsonString = '{"key": "value", "number": 42}';

const originalDecode = JsonAsString.decode;
JsonAsString.decode = function(input) {
  console.log("Inputr is:", input);
  const result = originalDecode.apply(this, arguments);
  console.log("Decodes Value:", result);
  return result;
};
console.log("SALIII is:");
// The library automatically provides the context when calling decode
const decodedValue = JsonAsString.decode(jsonString);

if (decodedValue) {
  console.log('Decoded Value:', decodedValue);
} else {
  console.error('Failed to decode JSON string:', jsonString);
}
