const _ = require('lodash');
const axios = require('axios');
const q = require('q');

// Only these parameters are included in the Zoopla request.
const ALLOWED_PARAMS = ['api_key', 'country', 'postcode', 'area', 'page_number', 'page_size',
    'listing_status', 'include_rented', 'order_by'];
const MAX_PAGE_SIZE = 100;

class ZooplaRentalService {

  constructor(args) {
    _.extend(this, {
      apiUrl: 'http://api.zoopla.co.uk/api/v1/property_listings.js',
      pageSize: 100
    }, args);
    if (!this.apiKey) {
      throw new Error('No API key provided');
    }
  }

  getListings(options={}) {
    _.defaults(options, {
      country: 'England',
      postcode: 'BR1',
      pageNumber: 1,
      pageSize: 100
    });
    return q.resolve({foo: 'bar'});
    // return axios.get();
  }

}

module.exports = ZooplaRentalService;
