# Property Listing Services

## Setup

Default configuration is in `src/config.js` and environment variables will override it.

If you need to use the Zoopla API, [set up an account](http://developer.zoopla.com/member/register) and set this environment variable with the API key:

	export ZOOPLA_API_KEY=<key>

## Tests

The tests rely on the [mock server](https://github.com/aramk/zoopla-api-mock). Run this as a separate process.

	npm test              # single execution
	npm run test-watch    # re-execute on changes 

If the test suite requires more data from the API, this mock should be extended.
