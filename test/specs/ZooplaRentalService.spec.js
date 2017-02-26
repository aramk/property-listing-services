const ZooplaRentalService = require('../../src/ZooplaRentalService');

describe('ZooplaRentalService', () => {

  let service;

  beforeEach(() => {
    service = createService();
  });

  it('can be constructed', () => {
    expect(service).to.be.defined;
  });
  
  it('can request listings', () => {
    return service.getListings({
      postcode: 'BR2'
    }).then(result => {
      expect(result.status).to.equal(200);
      // area_name has a space prefix from the API ¯\_(ツ)_/¯
      expect(result.data.area_name).to.equal(' BR2');
      expect(result.data.country).to.equal('England');
      expect(result.data.result_count).to.equal(300);
      expect(result.data.listing).to.have.length(100);
      const listing = result.data.listing[0];
      expect(listing).to.have.property('listing_id', '16067968');
    });
  });

  it('can request listings on a given page', () => {
    return service.getListings({
      postcode: 'BR2',
      pageNumber: 2
    }).then(result => {
      expect(result.status).to.equal(200);
      expect(result.data.area_name).to.equal(' BR2');
      expect(result.data.country).to.equal('England');
      expect(result.data.result_count).to.equal(300);
      expect(result.data.listing).to.have.length(100);
      const listing = result.data.listing[0];
      expect(listing).to.have.property('listing_id', '42548994');
    });
  });

  it('can request listings on an empty page', () => {
    return service.getListings({
      postcode: 'BR2',
      pageNumber: 4
    }).then(result => {
      expect(result.status).to.equal(200);
      expect(result.data.area_name).to.equal(' BR2');
      expect(result.data.country).to.equal('England');
      expect(result.data.result_count).to.equal(300);
      expect(result.data.listing).to.have.length(0);
    });
  });

});

function createService() {
  return new ZooplaRentalService({
    apiKey: process.env.ZOOPLA_API_KEY
  });
}
