describe('Kiểm tra Neighbor BK', () => {
    // NEW SECTION
    it('Hiển thị trang chủ', () => {
        cy.visit('/'); // Mở trang chủ, dựa vào baseUrl trong config

        // Kiểm tra tiêu đề trang
        cy.title().should('include', 'Neighbor');
    });

    // NEW SECTION
    it('Điều hướng đến trang Đăng nhập', () => {
        cy.visit('/login');

        // Tìm và nhấn vào nút hoặc liên kết "Đăng nhập"
        cy.contains('Log In').click();

        // Kiểm tra URL sau khi điều hướng
        cy.url().should('include', '/login');

        // Kiểm tra form đăng nhập hiển thị
        cy.get('form').should('exist');
    });

    // NEW SECTION
    it('Đăng nhập với thông tin hợp lệ', () => {
        cy.fixture('example.json').then((data) => {
            cy.visit('/login');

            // Điền thông tin đăng nhập
            cy.get('input[name="email"]').type(data.email);
            cy.get('input[name="password"]').type(data.password);

            // Nhấn nút đăng nhập
            cy.get('button[type="submit"]').click();            
        });

        // Kiểm tra trang cá nhân
        cy.wait(1000);
        cy.get('#avatarButton').click();
        cy.contains('Hello').click();
        cy.url().should('include', '/profile');
    });
    // NEW SECTION
});
