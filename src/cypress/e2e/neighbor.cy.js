describe('Kiểm tra Neighbor BK', () => {
    it('Hiển thị trang chủ', () => {
    cy.visit('/'); // Mở trang chủ, dựa vào baseUrl trong config

    // Kiểm tra tiêu đề trang
    cy.title().should('include', 'Neighbor');
    });

    it('Điều hướng đến trang Đăng nhập', () => {
    cy.visit('/login');

    // Tìm và nhấn vào nút hoặc liên kết "Đăng nhập"
    cy.contains('Log In').click();

    // Kiểm tra URL sau khi điều hướng
    cy.url().should('include', '/login');

    // Kiểm tra form đăng nhập hiển thị
    cy.get('form').should('exist');
    });
});
  