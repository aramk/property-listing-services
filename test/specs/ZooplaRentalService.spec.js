const ZooplaRentalService = require('../../src/ZooplaRentalService');

describe('ZooplaRentalService', () => {

  it('should exist', () => expect(ZooplaRentalService).to.be.defined);
  
  it('can be constructed', () => {
    const service = createService();
    expect(service).to.be.defined;
  });
  
  it('can request listings', () => {
    const service = createService();
    const request = service.getListings({
      postcode: 'BR2'
    });
    console.log(request.then)
    return expect(request)
      .to.eventually.deep.equal({foo: 'bar'});
  });

});

function createService() {
  return new ZooplaRentalService({
    apiKey: process.env.ZOOPLA_API_KEY
  });
}
