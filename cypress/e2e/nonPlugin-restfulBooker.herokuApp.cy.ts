const NP_FIRST_NAME = 'Brad';
const NP_UPDATED_FIRST_NAME = 'Bradley';
const NP_LAST_NAME = 'Reaney';
const NP_TOTAL_PRICE = 111;
const NP_DEPOSIT_PAID = true;
const NP_DATE = '2023-02-27';
const NP_ADDITIONAL_NEEDS = 'Breakfast';
let NP_BOOKING_ID: number = null;
let NP_TOKEN: string = null;

describe('Example API tests using cypress-plugin-api', () => {

	it('should perform a health check', () => {
		cy.request('/ping').then((response) => {
			expect(response.status).to.equal(201);
			expect(response.body).to.equal('Created');
		});
	});

	it('should create a booking', () => {
		cy.request({
			method: 'POST',
			url: '/booking',
			body: {
				'firstname': NP_FIRST_NAME,
				'lastname': NP_LAST_NAME,
				'totalprice': NP_TOTAL_PRICE,
				'depositpaid': NP_DEPOSIT_PAID,
				'bookingdates': {
					'checkin': NP_DATE,
					'checkout': NP_DATE
				},
				'additionalneeds': NP_ADDITIONAL_NEEDS
			}
		}).then((response) => {
			expect(response.status).to.equal(200);
			expect(response.body).to.have.property('bookingid');
			NP_BOOKING_ID = response.body.bookingid;
			expect(response.body.bookingid).to.be.a('number');
			expect(response.body).to.have.property('booking');
			expect(response.body.booking.firstname).to.equal(NP_FIRST_NAME);
			expect(response.body.booking.lastname).to.equal(NP_LAST_NAME);
			expect(response.body.booking.totalprice).to.equal(NP_TOTAL_PRICE);
			expect(response.body.booking.depositpaid).to.be.true;
			expect(response.body.booking.bookingdates.checkin).to.equal(NP_DATE);
			expect(response.body.booking.bookingdates.checkout).to.equal(NP_DATE);
			expect(response.body.booking.additionalneeds).to.equal(NP_ADDITIONAL_NEEDS);
		});
	});

	it('should return a booking id', () => {
		cy.request(`/booking?firstname=${NP_FIRST_NAME}&lastname=${NP_LAST_NAME}`).then((response) => {
			expect(JSON.stringify(response.body)).to.contain(`"bookingid":${NP_BOOKING_ID}`);
		});
	});

	it('should return a booking', () => {
		cy.request(`/booking/${NP_BOOKING_ID}`).then((response) => {
			expect(response.body.firstname).to.equal(NP_FIRST_NAME);
			expect(response.body.lastname).to.equal(NP_LAST_NAME);
			expect(response.body.totalprice).to.equal(NP_TOTAL_PRICE);
			expect(response.body.depositpaid).to.be.true;
			expect(response.body.bookingdates.checkin).to.equal(NP_DATE);
			expect(response.body.bookingdates.checkout).to.equal(NP_DATE);
			expect(response.body.additionalneeds).to.equal(NP_ADDITIONAL_NEEDS);
		});
	});

	it('should create a token and update a booking', () => {
		cy.request({
			method: 'POST',
			url: '/auth',
			body: {
				'username': `${Cypress.env('apiUsername')}`,
				'password': `${Cypress.env('apiPassword')}`
			}
		}).then((response) => {
			expect(response.body).to.have.property('token');
			NP_TOKEN = response.body.token;
			cy.request({
				method: 'PATCH',
				url: `/booking/${NP_BOOKING_ID}`,
				headers: {
					cookie: `token=${NP_TOKEN}`
				},
				body: {
					'firstname': NP_UPDATED_FIRST_NAME
				}
			}).then((response) => {
				expect(response.body.firstname).to.equal(NP_UPDATED_FIRST_NAME);
				expect(response.body.lastname).to.equal(NP_LAST_NAME);
				expect(response.body.totalprice).to.equal(NP_TOTAL_PRICE);
				expect(response.body.depositpaid).to.be.true;
				expect(response.body.bookingdates.checkin).to.equal(NP_DATE);
				expect(response.body.bookingdates.checkout).to.equal(NP_DATE);
				expect(response.body.additionalneeds).to.equal(NP_ADDITIONAL_NEEDS);
			});
		});
	});

	it('should delete a booking', () => {
		cy.request({
			method: 'DELETE',
			url: `/booking/${NP_BOOKING_ID}`,
			headers: {
				cookie: `token=${NP_TOKEN}`
			}
		}).then((response) => {
			expect(response.status).to.equal(201);
		});
	});
});