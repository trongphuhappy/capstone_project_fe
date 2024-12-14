// NEW SECTION: Edit profile
it('Chỉnh sửa thông tin cá nhân', () => {
    cy.fixture('example.json').then((data) => {
        cy.visit('/login');

        // Điền thông tin đăng nhập
        cy.get('input[name="email"]').type(data.email);
        cy.get('input[name="password"]').type(data.password);

        // Nhấn nút đăng nhập
        cy.get('button[type="submit"]').click();            
    });

    // Điều hướng đến trang chỉnh sửa thông tin cá nhân
    cy.wait(1000);
    cy.get('#avatarButton').click();
    cy.contains('Hello').click();
    cy.url().should('include', '/profile');

    cy.contains('Lessor')   // Tìm phần tử chứa từ "Lessor"
      .parent()             // Lấy phần tử cha của nó
      .contains('Add')      // Tìm nút có chữ "Add" bên trong
      .click();             // Click vào nút đó

    // Điền thông tin 
    cy.get('input[placeholder="Shop name"]').type('My Shop');
    cy.get('input[placeholder="Address"]').type('123 Nguyen Trai, District 1');
    cy.get('body')

    // Bấm nút Save
    cy.contains('Save').click();
});