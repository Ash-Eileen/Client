context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup')
  })

it('Page is there', () => { 

    cy.get(".signupHeading") 
    .should('have.text', "Sign Up")
    
  })   

})

//  it('Register Success', () => {
    
//   })  


//  it('Register Failure', () => {
    

//   })  

// lol 5 percent untested

// unique id 
// reset db before running on specifically the test database