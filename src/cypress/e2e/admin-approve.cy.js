const { Cylinder } = require("lucide-react");

it('Admin kiểm duyệt sản phẩm', () => {
    cy.visit('/admin/dashboard');
    cy.url().should('include', '/dashboard'); 
});