const FIRST_NAME = 'Brad';
const UPDATED_FIRST_NAME = 'Bradley';
const LAST_NAME = 'Reaney';
const TOTAL_PRICE = 111;
const DEPOSIT_PAID = true;
const DATE = '2023-02-27';
const ADDITIONAL_NEEDS = 'Breakfast';
let BOOKING_ID = null;
let TOKEN = null;

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
      BOOKING_ID = response.body.bookingid
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
    cy.api(`/booking?firstname=${FIRST_NAME}&lastname=${LAST_NAME}`).then((response) => {
      expect(JSON.stringify(response.body)).to.contain(`"bookingid":${BOOKING_ID}`);
    })
  })

  it('should return a booking', () => {
    cy.api(`/booking/${BOOKING_ID}`).then((response) => {
      expect(response.body.firstname).to.equal(FIRST_NAME);
      expect(response.body.lastname).to.equal(LAST_NAME);
      expect(response.body.totalprice).to.equal(TOTAL_PRICE);
      expect(response.body.depositpaid).to.be.true;
      expect(response.body.bookingdates.checkin).to.equal(DATE);
      expect(response.body.bookingdates.checkout).to.equal(DATE);
      expect(response.body.additionalneeds).to.equal(ADDITIONAL_NEEDS);
    })
  })

  it('should create a token and update a booking', { env: { hideCredentials: true} }, () => {
    cy.api('POST', '/auth', {"username": `${Cypress.env('apiUsername')}`, "password": `${Cypress.env('apiPassword')}`}).then((response) => {
      expect(response.body).to.have.property('token');
      TOKEN = response.body.token;
      cy.api({
        method: 'PATCH',
        url: `/booking/${BOOKING_ID}`,
        headers: {
          cookie: `token=${TOKEN}`
        },
        body: {
          "firstname": UPDATED_FIRST_NAME
        }
      }).then((response) => {
        expect(response.body.firstname).to.equal(UPDATED_FIRST_NAME);
        expect(response.body.lastname).to.equal(LAST_NAME);
        expect(response.body.totalprice).to.equal(TOTAL_PRICE);
        expect(response.body.depositpaid).to.be.true;
        expect(response.body.bookingdates.checkin).to.equal(DATE);
        expect(response.body.bookingdates.checkout).to.equal(DATE);
        expect(response.body.additionalneeds).to.equal(ADDITIONAL_NEEDS);
      })
    })
  })

  it('should delete a booking', { env: { hideCredentials: true } }, () => {
    cy.api({
      method: 'DELETE',
        url: `/booking/${BOOKING_ID}`,
        headers: {
          cookie: `token=${TOKEN}`
        }
    }).then((response) => {
      expect(response.status).to.equal(201);
    })
  })
})