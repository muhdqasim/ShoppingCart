import { Environment, Network, RecordSource, Store } from "relay-runtime";

const HTTP_ENDPOINT = "/api";
 

const fetchFn = async (request, variables) => {
  try {
    const response = await fetch(HTTP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: request.text,
        variables,
      }),
    });
    if (!response.ok) {
      console.log("response", response);
      throw new Error(`HTTP error ${response.status}`);
    }
    const res = response.json();
    return res;
  } catch (error) {
    console.error(`Failed to fetch GraphQL query: ${error}`);
    throw error;
  }
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();
