const _ = require('lodash');
const axios = require('axios');
const Q = require('q');

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

  // Returns a single page of listings.
  getListings(params={}) {
    _.defaults(params, {
      country: 'England',
      postcode: 'BR1',
      pageNumber: 1,
      pageSize: 100
    });
    return axios.get(this.config.apiUrl, {
      params: {
        api_key: this.config.apiKey,
        country: params.country,
        postcode: params.postcode,
        page_number: params.pageNumber,
        page_size: params.pageSize
      }
    }).then(response => response.data);
  }

  // Returns all pages of listings for the given parameters.
  getAllListings(params) {
    return getAllListings.call(this, {params});
  }

}

function getAllListings({ pageNumber=1, combinedResult={}, params } = {}) {
  return this.getListings(_.defaults({pageNumber}, params)).then(result => {
    if (combinedResult.listing) {
      combinedResult.listing.push(...result.listing);
    } else {
      _.extend(combinedResult, result);
    }
    if (result.listing.length === 0) {
      return combinedResult;
    } else {
      return getAllListings.call(this, {pageNumber: pageNumber + 1, combinedResult, params});
    }
  });
}

module.exports = ZooplaRentalService;
