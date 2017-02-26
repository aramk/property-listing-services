const LondonPostcodes = require('../../src/LondonPostcodes');

describe('LondonPostcodes', () => {

  it('should exist', () => expect(LondonPostcodes).to.be.defined);
  
  it('has postcodes', () => {
    expect(LondonPostcodes.BR1).to.deep.equal({
      "postcode": "BR1",
      "eastings": "540600",
      "northings": "170000",
      "latitude": "51.41107",
      "longitude": "0.02192",
      "town": "Bromley",
      "region": "Greater London",
      "country": "ENG",
      "country_string": "England"
    });
  })

});
