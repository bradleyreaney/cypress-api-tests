const FIRST_NAME = 'Brad';
const LAST_NAME = 'Reaney';
const TOTAL_PRICE = 111;
const DEPOSIT_PAID = true;
const DATE = '2023-02-27';
const ADDITIONAL_NEEDS = 'Breakfast';

describe('Exmaple API tests using cypress-plugin-api', () => {
  
  it('should perform a health check', () => {
    cy.api('/ping').then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.equal('Created');
    })
  })

  it('should create a booking', () => {
    cy.api({
      method: 'POST',
      url: '/booking',
      body: {
        'firstname': FIRST_NAME,
        'lastname': LAST_NAME,
        'totalprice': TOTAL_PRICE,
        'depositpaid': DEPOSIT_PAID,
        'bookingdates': {
            'checkin': DATE,
            'checkout': DATE
        },
        'additionalneeds': ADDITIONAL_NEEDS
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
    })
  })
})