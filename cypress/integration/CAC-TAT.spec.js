describe('Cental de Atendimento ao Cliente TAT', () => {
    beforeEach(function () {
        cy.visit('./src/index.html'); 
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');    
    });

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Brunno');
        cy.get('#lastName').type('Mendes');
        cy.get('#email').type('email@teste.com');
        cy.get('#open-text-area').type('Teste', { "delay": 100});
        cy.contains('button', 'Enviar').click();
        cy.get('.success').should('be.visible');
    });
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#email').type('email.teste.com');
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um telefone com formatação inválida', function() {
        cy.get('#phone').type('ABCD');
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    });
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#phone-checkbox').check();
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    });
    
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Brunno').should('have.value', 'Brunno').clear().should('have.value', '');
        cy.get('#lastName').type('Mendes').should('have.value', 'Mendes').clear().should('have.value', '');
        cy.get('#email').type('email@teste.com').should('have.value', 'email@teste.com').clear().should('have.value', '');
        cy.get('#phone').type('12345678').should('have.value', '12345678').clear().should('have.value', '');
    });
    
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit();
    });

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1).should('have.value', 'blog');
    });

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback');
    });

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .each(function($checkbox) {
                cy.wrap($checkbox).check()
                cy.wrap($checkbox).should('be.checked')
            })
            .last().uncheck().should('not.checked')
    });

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })
})



