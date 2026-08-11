const API_URL =
  Cypress.env('API_PATH') ||
  `http://${Cypress.env('BACKEND_HOST') || '127.0.0.1'}:55001/${
    Cypress.env('SITE_ID') || 'plone'
  }`;

const TEST_CONTENT = [
  'single-item',
  'source-container',
  'restored-children',
  'purge-item',
  'first-item',
  'second-item',
  'whole-container',
  'alternate-item',
  'alternate-target',
  'cancel-first-item',
  'cancel-second-item',
  'collision-item',
  'filter-alpha',
  'filter-beta',
];

const TEST_USER = 'recycle-bin-member';

const deleteTestContent = () => {
  TEST_CONTENT.forEach((path) => {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/${path}`,
      headers: { Accept: 'application/json' },
      auth: { user: 'admin', pass: 'secret' },
      failOnStatusCode: false,
    });
  });
};

const emptyRecycleBin = () =>
  cy.request({
    method: 'DELETE',
    url: `${API_URL}/@recyclebin`,
    headers: { Accept: 'application/json' },
    auth: { user: 'admin', pass: 'secret' },
  });

const deleteTestUser = () =>
  cy.request({
    method: 'DELETE',
    url: `${API_URL}/@users/${TEST_USER}`,
    headers: { Accept: 'application/json' },
    auth: { user: 'admin', pass: 'secret' },
    failOnStatusCode: false,
  });

const deleteThroughVolto = (path) => {
  cy.intercept('DELETE', `**/${path}`).as('deleteContent');
  cy.visit(`/${path}/delete`);
  cy.findByRole('button', { name: 'Ok' }).click();
  cy.wait('@deleteContent');
};

const visitRecycleBin = () => {
  cy.intercept('GET', '**/++api++/@recyclebin*').as('getRecycleBin');
  cy.visit('/@@recyclebin');
  cy.wait('@getRecycleBin').its('response.statusCode').should('eq', 200);
  cy.get('#page-recycle-bin').should('be.visible');
  cy.findByRole('heading', { name: 'Recycle bin', level: 1 }).should(
    'be.visible',
  );
};

describe('Recycle bin', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    deleteTestContent();
    emptyRecycleBin();
    deleteTestUser();
    cy.autologin();
  });

  afterEach(() => {
    deleteTestUser();
  });

  it('deletes and restores a single item', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'single-item',
      contentTitle: 'Single item',
    });

    deleteThroughVolto('single-item');
    visitRecycleBin();

    cy.findByRole('link', { name: 'Single item' }).should('be.visible');
    cy.findByLabelText('Select Single item').check({ force: true });
    cy.findByRole('button', { name: 'Restore selected' }).click();

    cy.location('pathname').should('eq', '/single-item');
    cy.findByRole('heading', { name: 'Single item', level: 1 }).should(
      'be.visible',
    );

    visitRecycleBin();
    cy.contains('The recycle bin is empty.').should('be.visible');
  });

  it('deletes a container document and restores one of its children', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'source-container',
      contentTitle: 'Source container',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'child-item',
      contentTitle: 'Child item',
      path: 'source-container',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'restored-children',
      contentTitle: 'Restored children',
    });

    deleteThroughVolto('source-container');
    visitRecycleBin();

    cy.findByRole('link', { name: 'Source container' }).click();
    cy.findByRole('heading', { name: /Source container/, level: 1 }).should(
      'be.visible',
    );
    cy.findByLabelText('Target path for Child item')
      .type('restored-children')
      .parents('tr')
      .within(() => {
        cy.findByRole('button', { name: 'Restore' }).click();
      });

    cy.contains('Operation completed successfully.').should('be.visible');
    cy.visit('/restored-children/child-item');
    cy.findByRole('heading', { name: 'Child item', level: 1 }).should(
      'be.visible',
    );
  });

  it('restores a whole container document with its descendants', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'whole-container',
      contentTitle: 'Whole container',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'whole-child',
      contentTitle: 'Whole child',
      path: 'whole-container',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'whole-grandchild',
      contentTitle: 'Whole grandchild',
      path: 'whole-container/whole-child',
    });

    deleteThroughVolto('whole-container');
    visitRecycleBin();

    cy.findByLabelText('Select Whole container').check({ force: true });
    cy.findByRole('button', { name: 'Restore selected' }).click();

    cy.location('pathname').should('eq', '/whole-container');
    cy.visit('/whole-container/whole-child/whole-grandchild');
    cy.findByRole('heading', { name: 'Whole grandchild', level: 1 }).should(
      'be.visible',
    );
  });

  it('restores an item to an alternate container document', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'alternate-item',
      contentTitle: 'Alternate item',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'alternate-target',
      contentTitle: 'Alternate target',
    });
    cy.removeContent({ path: 'alternate-item' });
    visitRecycleBin();

    cy.findByRole('link', { name: 'Alternate item' }).click();
    cy.get('.recycle-bin-restore-panel').within(() => {
      cy.findByLabelText('Target path').type('alternate-target');
      cy.findByRole('button', { name: 'Restore' }).click();
    });

    cy.location('pathname').should('eq', '/alternate-target/alternate-item');
    cy.findByRole('heading', { name: 'Alternate item', level: 1 }).should(
      'be.visible',
    );
  });

  it('purges an item', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'purge-item',
      contentTitle: 'Purge item',
    });
    cy.removeContent({ path: 'purge-item' });
    visitRecycleBin();

    cy.findByLabelText('Select Purge item').check({ force: true });
    cy.on('window:confirm', (message) => {
      expect(message).to.equal(
        'Permanently delete the selected items? This cannot be undone.',
      );
      return true;
    });
    cy.findByRole('button', { name: 'Delete selected' }).click();

    cy.contains('The recycle bin is empty.').should('be.visible');
  });

  it('empties the recycle bin', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'first-item',
      contentTitle: 'First item',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'second-item',
      contentTitle: 'Second item',
    });
    cy.removeContent({ path: 'first-item' });
    cy.removeContent({ path: 'second-item' });
    visitRecycleBin();

    cy.findByRole('link', { name: 'First item' }).should('be.visible');
    cy.findByRole('link', { name: 'Second item' }).should('be.visible');
    cy.on('window:confirm', (message) => {
      expect(message).to.equal(
        'Permanently delete every item in the recycle bin? This cannot be undone.',
      );
      return true;
    });
    cy.findByRole('button', { name: 'Empty recycle bin' }).click();

    cy.contains('The recycle bin is empty.').should('be.visible');
    cy.findByRole('link', { name: 'First item' }).should('not.exist');
    cy.findByRole('link', { name: 'Second item' }).should('not.exist');
  });

  it('cancels permanent deletion actions without changing the recycle bin', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'cancel-first-item',
      contentTitle: 'Cancel first item',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'cancel-second-item',
      contentTitle: 'Cancel second item',
    });
    cy.removeContent({ path: 'cancel-first-item' });
    cy.removeContent({ path: 'cancel-second-item' });
    visitRecycleBin();

    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(false).as('confirm');
    });
    cy.findByLabelText('Select Cancel first item').check({ force: true });
    cy.findByRole('button', { name: 'Delete selected' }).click();
    cy.findByRole('button', { name: 'Empty recycle bin' }).click();

    cy.get('@confirm').should('have.been.calledTwice');
    cy.findByRole('link', { name: 'Cancel first item' }).should('be.visible');
    cy.findByRole('link', { name: 'Cancel second item' }).should('be.visible');
  });

  it('does not overwrite an existing item when restoration has a name conflict', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'collision-item',
      contentTitle: 'Original collision item',
    });
    cy.removeContent({ path: 'collision-item' });
    cy.createContent({
      contentType: 'Document',
      contentId: 'collision-item',
      contentTitle: 'Replacement collision item',
    });
    visitRecycleBin();

    cy.findByRole('link', { name: 'Original collision item' }).click();
    cy.get('.recycle-bin-restore-panel').within(() => {
      cy.findByRole('button', { name: 'Restore' }).click();
    });

    cy.get('.ui.negative.message').should('be.visible');
    cy.visit('/collision-item');
    cy.findByRole('heading', {
      name: 'Replacement collision item',
      level: 1,
    }).should('be.visible');
    visitRecycleBin();
    cy.findByRole('link', { name: 'Original collision item' }).should(
      'be.visible',
    );
  });

  it('filters recycled items by title', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'filter-alpha',
      contentTitle: 'Filter alpha',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'filter-beta',
      contentTitle: 'Filter beta',
    });
    cy.removeContent({ path: 'filter-alpha' });
    cy.removeContent({ path: 'filter-beta' });
    visitRecycleBin();

    cy.get('.recycle-bin-filters').within(() => {
      cy.findByLabelText('Search').type('Filter alpha');
      cy.findByRole('button', { name: 'Apply filters' }).click();
    });

    cy.location('search').should('include', 'title=Filter+alpha');
    cy.findByRole('link', { name: 'Filter alpha' }).should('be.visible');
    cy.findByRole('link', { name: 'Filter beta' }).should('not.exist');
  });

  it('denies recycle-bin access to a member without permission', () => {
    cy.createUser({
      username: TEST_USER,
      fullname: 'Recycle bin member',
      password: 'password',
      roles: ['Member'],
    });
    cy.autologin(TEST_USER, 'password');
    cy.intercept('GET', '**/++api++/@recyclebin*').as('getDeniedRecycleBin');

    cy.visit('/@@recyclebin');

    cy.wait('@getDeniedRecycleBin')
      .its('response.statusCode')
      .should('be.oneOf', [401, 403]);
    cy.findByText('Recycle bin unavailable').should('be.visible');
  });
});
