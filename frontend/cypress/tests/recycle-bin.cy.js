const API_URL =
  Cypress.env('API_PATH') ||
  `http://${Cypress.env('BACKEND_HOST') || '127.0.0.1'}:55001/${
    Cypress.env('SITE_ID') || 'plone'
  }`;

const TEST_CONTENT = [
  'single-item',
  'source-folder',
  'restored-children',
  'purge-item',
  'first-item',
  'second-item',
];

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
    cy.autologin();
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

  it('deletes a folder and restores one of its children', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'source-folder',
      contentTitle: 'Source folder',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'child-item',
      contentTitle: 'Child item',
      path: 'source-folder',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'restored-children',
      contentTitle: 'Restored children',
    });

    deleteThroughVolto('source-folder');
    visitRecycleBin();

    cy.findByRole('link', { name: 'Source folder' }).click();
    cy.findByRole('heading', { name: /Source folder/, level: 1 }).should(
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
});
