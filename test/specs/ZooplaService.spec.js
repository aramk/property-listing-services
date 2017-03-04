const ZooplaService = require('../../src/ZooplaService');

describe('ZooplaService', () => {

  let service;

  beforeEach(() => {
    service = new ZooplaService();
  });

  it('can be constructed', () => {
    expect(service).to.be.defined;
  });
  
  it('can request listings', () => {
    return service.getListings({
      postcode: 'BR2'
    }).then(result => {
      // area_name has a space prefix from the API ¯\_(ツ)_/¯
      expect(result.area_name).to.equal(' BR2');
      expect(result.country).to.equal('England');
      expect(result.result_count).to.equal(300);
      expect(result.listing).to.have.length(100);
      const listing = result.listing[0];
      expect(listing).to.have.property('listing_id', '16067968');
    });
  });

  it('can request listings on a given page', () => {
    return service.getListings({
      postcode: 'BR2',
      pageNumber: 2
    }).then(result => {
      expect(result.area_name).to.equal(' BR2');
      expect(result.country).to.equal('England');
      expect(result.result_count).to.equal(300);
      expect(result.listing).to.have.length(100);
      expect(result.listing[0]).to.have.property('listing_id', '42548994');
    });
  });

  it('can request listings on an empty page', () => {
    return service.getListings({
      postcode: 'BR2',
      pageNumber: 4
    }).then(result => {
      expect(result.area_name).to.equal(' BR2');
      expect(result.country).to.equal('England');
      expect(result.result_count).to.equal(300);
      expect(result.listing).to.have.length(0);
    });
  });

  it('can request listings on all pages', () => {
    return service.getAllListings({
      postcode: 'BR2'
    }).then(result => {
      expect(result.area_name).to.equal(' BR2');
      expect(result.country).to.equal('England');
      expect(result.result_count).to.equal(300);
      expect(result.listing).to.have.length(300);
      expect(result.listing[0]).to.have.property('listing_id', '16067968');
      expect(result.listing[100]).to.have.property('listing_id', '42548994');
      expect(result.listing[299]).to.have.property('listing_id', '42403893');
    });
  });

});
