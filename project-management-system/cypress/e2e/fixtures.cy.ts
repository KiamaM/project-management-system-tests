describe('Testing refistration flow', () => {
    it('Navigates the user as expected', () => {
      cy.visit('http://localhost:4200/')
  
      cy.get('[data-cy="register"]').click()
  
      cy.location('pathname').should('equal', '/register')  
      
    })

  })

  describe('Working with fixtures to test login', ()=>{
    let data:{
      email:string,
      password:string
    }
    before(()=>{
      cy.fixture('login.json').then((info)=>{
        data = info
      })
    })

    it('Iterates through login.json to test and tries to login', ()=>{

      cy.visit('http://localhost:4200/login')

      cy.fixture('login.json').then((dataArray)=>{
        dataArray.forEach((data:{email:string, password:string}) => {
          cy.get('[data-cy="email"]').type(data.email)
          cy.get('[data-cy="password"]').type(data.password)

          if(data.email == 'hello@cypress.io' && data.password == '12345678'){
            cy.get('#signIn').click()
            cy.location('pathname').should('equal', '')
            cy.visit('http://localhost:4200/login')
          }else if(data.email == 'hello@cypress.io' && data.password != '12345678'){
            cy.get('#signIn').click()
            cy.get('notLoggedInErrorDiv').contains('Incorrect Password')
          }else
          cy.get('#signIn').click()
          cy.get('errorDiv').contains('Field is required')
        });
      })

    })
  })


  describe('Working with fixtures to test login', ()=>{
    let data:{
      first_name: "John",
      last_name:"Doe",
      email: "hello@cypress.io",
      password:"12345678"
    }
    before(()=>{
      cy.fixture('login.json').then((info)=>{
        data = info
      })
    })

    it('Iterates gets user from register.json to test and tries to register user', ()=>{

      cy.visit('http://localhost:4200/register')

      cy.fixture('register.json').then((data)=>{
          cy.get('[data-cy="first_name"]').type(data.first_name)
          cy.get('[data-cy="last_name"]').type(data.last_name)       
          cy.get('[data-cy="email"]').type(data.email)
          cy.get('[data-cy="password"]').type(data.password)

            cy.get('#createUser').click()            
            cy.location('pathname').should('equal', 'login')
      })

    })
  })