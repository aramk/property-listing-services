const _ = require('lodash');
const axios = require('axios');
const q = require('q');

const envConfig = require('./config');

// Only these parameters are included in the Zoopla request.
const ALLOWED_PARAMS = ['api_key', 'country', 'postcode', 'area', 'page_number', 'page_size',
    'listing_status', 'include_rented', 'order_by'];
const MAX_PAGE_SIZE = 100;

class ZooplaRentalService {

  constructor(config={}) {
    this.config = _.defaults(config, {
      apiUrl: envConfig.ZOOPLA_API_HOST + '/api/v1/property_listings.js',
      apiKey: envConfig.ZOOPLA_API_KEY,
      pageSize: 100
    });
  }

  getListings(options={}) {
    _.defaults(options, {
      country: 'England',
      postcode: 'BR1',
      pageNumber: 1,
      pageSize: 100
    });
    console.log('this.config.apiUrl', this.config.apiUrl);
    return axios.get(this.config.apiUrl, {
      params: {
        api_key: this.config.apiKey,
        country: options.country,
        postcode: options.postcode,
        page_number: options.pageNumber,
        page_size: options.pageSize
      }
    });
  }

}

module.exports = ZooplaRentalService;
