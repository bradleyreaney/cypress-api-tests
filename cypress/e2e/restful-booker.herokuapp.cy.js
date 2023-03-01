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
      expect(response.body).to.have.property('bookingid');
      expect(response.body.bookingid).to.be.a('number');
      expect(response.body).to.have.property('booking');
      expect(response.body.booking.firstname).to.equal(FIRST_NAME);
      expect(response.body.booking.lastname).to.equal(LAST_NAME);
      expect(response.body.booking.totalprice).to.equal(TOTAL_PRICE);
      expect(response.body.booking.depositpaid).to.be.true;
      expect(response.body.booking.bookingdates.checkin).to.equal(DATE);
      expect(response.body.booking.bookingdates.checkout).to.equal(DATE);
      expect(response.body.booking.additionalneeds).to.equal(ADDITIONAL_NEEDS);
    })
  })

  it('should return a booking id', () => {
    //TODO
  })
})