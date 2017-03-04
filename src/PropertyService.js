const _ = require('lodash');
const moment = require('moment');
const Q = require('q');

const Property = require('@aramk/property-listing-models').Property;
const ZooplaService = require('./ZooplaService');

const STATUS_MAP = {
  for_sale: 'active',
  sale_under_offer: 'offer',
  sold: 'inactive',
  to_rent: 'active',
  rent_under_offer: 'offer',
  rented: 'inacitve'
};

class PropertyService {

  constructor(config={}) {
    this.config = _.defaults(config, {
      zoopla: {}
    });
    this.zoopla = new ZooplaService(this.config.zoopla);
  }

  createZooplaProperties(params) {
    return this.getZooplaProperties(params).then(properties => {
      let promises = properties.map(property => {
        return Property.findOne({
          'property.zoopla.listingId': property.zoopla.listingId
        }).then(existing => {
          if (!existing) return promises.push(property.save());
        });
      });
      promises = _.compact(promises);
      // Ensure all properties are persisted and returned.
      return Q.all(promises).then(() => properties);
    });
  }

  getZooplaProperties(params) {
    return this.zoopla.getAllListings(params).then(listings => {
      return this.convertZooplaListings(listings);
    });
  }

  convertZooplaListings(listings) {
    return listings.listing.map(listing => {
      return this.convertZooplaListing(listing);
    });
  }

  convertZooplaListing(listing) {
    const args = {
      zoopla: {
        listingId: listing.listing_id,
        url: listing.details_url
      },
      description: listing.description,
      floors: listing.num_floors,
      bedrooms: listing.num_bedrooms,
      bathrooms: listing.num_bathrooms,
      listingType: listing.listing_status,
      propertyType: listing.property_type,
      location: {
        latitude: listing.latitude,
        longitude: listing.longitude,
        address: listing.displayable_address,
        postcode: listing.outcode,
        country: listing.country
      },
      images: []
    };

    if (listing.first_published_date) args.publishDate = moment.utc(listing.first_published_date).toDate();
    if (listing.status) args.status = STATUS_MAP[listing.status];
    if (listing.price) args.price = '£' + listing.price;
    if (listing.image_url) args.images.push({url: listing.image_url});
    if (listing.thumbnail_url) args.images[0].thumbnailUrl = listing.thumbnail_url;

    return new Property(args);
  }

}

module.exports = PropertyService;
