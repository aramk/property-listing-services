const moment = require('moment');

const PropertyService = require('../../src/PropertyService');
const listingFixture = require('../fixtures/listing.json');
const Property = require('@aramk/property-listing-models').Property;

describe('PropertyService', () => {

  let service;

  beforeEach(() => {
    service = new PropertyService();
  });

  it('can be constructed', () => {
    expect(service).to.be.defined;
  });
  
  it('can convert listings', () => {
    const property = service.convertZooplaListing(listingFixture);
    const error = property.validateSync();
    expect(error).to.be.undefined;
    const json = property.toJSON();
    expect(json.publishDate).to.be.defined;
    expect(moment.utc(json.publishDate).format()).to.equal('2016-08-09T16:25:04Z');
    expect(json).to.have.deep.property('zoopla.listingId', '41296981');
    expect(json).to.have.deep.property('zoopla.url', 'http://www.zoopla.co.uk/to-rent/details/41296981?utm_source=v1:5aSNAi3PGgfcqUG7Kupyp2H3fR8_1O_b&utm_medium=api');
    expect(json).to.have.property('description', 'A two bedroom detached house in the perfect location a short stroll away from Shortlands train station offering fast & frequent services into London Victoria & London Blackfriars.Call Capital Estate Agents on to book you appointment to view.');
    expect(json).to.have.property('floors', 2);
    expect(json).to.have.property('bedrooms', 2);
    expect(json).to.have.property('bathrooms', 1);
    expect(json).to.have.property('listingType', 'rent');
    expect(json).to.have.property('propertyType', 'Detached house');
    expect(json).to.have.property('price', '£1381');
    expect(json).to.have.deep.property('location.latitude', 51.40502);
    expect(json).to.have.deep.property('location.longitude', -0.002364);
    expect(json).to.have.deep.property('location.address', 'Hildenlea Place, Bromley BR2');
    expect(json).to.have.deep.property('location.postcode', 'BR2');
    expect(json).to.have.deep.property('location.country', 'England');
    expect(json).to.have.deep.property('images[0].url', 'https://li.zoocdn.com/2b0424946311a7b81ffa00bba83c0630e100f33b_354_255.jpg');
    expect(json).to.have.deep.property('images[0].thumbnailUrl', 'https://li.zoocdn.com/2b0424946311a7b81ffa00bba83c0630e100f33b_80_60.jpg');
  });

  it('can import listings', () => {
    return service.importZooplaProperties({
      postcode: 'BR2'
    }).then(properties => {
      expect(properties).to.have.length(300);
      expect(properties[0]).to.be.an.instanceOf(Property);
    });
  });

});
