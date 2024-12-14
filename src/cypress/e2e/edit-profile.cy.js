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
        cy.contains('Setting').click();
        cy.url().should('include', '/setting-profile');

        // Thay đổi tên
        cy.contains('First name').click();
        cy.get('input[name="firstName"]').clear().type('NewFirstName');
        cy.contains('Save').click();
        cy.wait(500);

        // Thay đổi họ
        cy.contains('Last name').click();
        cy.get('input[name="lastName"]').clear().type('NewLastName');
        cy.contains('Save').click();
    });