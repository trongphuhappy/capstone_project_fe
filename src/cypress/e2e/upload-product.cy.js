it('Chỉnh sửa thông tin cá nhân', () => {
    cy.fixture('example.json').then((data) => {
        cy.visit('/login');

        // Điền thông tin đăng nhập
        cy.get('input[name="email"]').type(data.email);
        cy.get('input[name="password"]').type(data.password);

        // Nhấn nút đăng nhập
        cy.get('button[type="submit"]').click();            
    });

    cy.wait(1000);
    cy.get('#avatarButton').click();
    cy.contains('Hello').click();
    cy.url().should('include', '/profile');

    cy.get('.mr-10 > .px-3').click();
    cy.get('.flex-col > .flex > .h-4').click();
    cy.contains('Couch').click();

    cy.get('.gap-y-4 > .relative > .rounded-md').click();
    cy.wait(5000);
    // continue
});