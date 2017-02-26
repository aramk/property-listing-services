# Property Listing Services

Services for working with housing property listings.

## Setup

Default configuration is in `src/config.js` and environment variables will override it.

The listings service uses the [Zoopla API](http://developer.zoopla.com/docs/read/Property_listings). You must [register](http://developer.zoopla.com/member/register) for an account and set this environment variable with the API key:

	export ZOOPLA_API_KEY=<key>

## Tests

The tests rely on the [mock server](https://github.com/aramk/zoopla-api-mock). Run this as a separate process, then execute either:

	npm test              # single execution
	npm run test-watch    # re-execute on changes 

If the test suite requires more data from the API, the mock server should be extended.
