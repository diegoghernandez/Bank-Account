import "@testing-library/jest-dom";
import { server } from "../mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

let storage = {};
const localStorageMock = {
   state: {
      "account": '{"idAccount":238589851,"accountName":"juan","email":"juan@names.com","currentBalance":54}'
   },
   setItem (key, item) {
      this.state[key] = item;
   },
   getItem (key) { 
      return this.state[key];
   },
   removeItem (key) { 
      delete storage[key];
   }
};
globalThis.localStorage = localStorageMock;