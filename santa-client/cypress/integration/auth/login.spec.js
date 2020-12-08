//   import {loginUser} from "../services/authServices" 
//   import {registerUser} from "../services/authServices" 
  
   it('Login fail', () => {
    
    cy.visit("http://localhost:3000/login")
    cy.get('.username')  
      .type('loginFail').should('have.value', 'loginFail')   
     
      cy.get('.password')  
      .type('loginFail').should('have.value', 'loginFail')    

      cy.get('.login').submit()  

      cy.get('.errors') 
      .contains("Invalid Credentials")
  }) 

    it('Login success', () => { 
    
    cy.visit("http://localhost:3000/signup")  

    cy.get('.username')  
      .type('fake').should('have.value', 'fake')   

       cy.get('.email')  
      .type('fake@fake').should('have.value', 'fake@fake')  

       cy.get('.password')  
      .type('fake').should('have.value', 'fake')  

      cy.get('.signup').submit()   

      cy.visit("http://localhost:3000/login") 

    cy.get('.username')  
      .type('fake').should('have.value', 'fake')   
     
      cy.get('.password')  
      .type('fake').should('have.value', 'fake')    

      cy.get('.login').submit()   

      cy.get('.log') 
      .should('have.text', "Logout")    
  })


    //   to test 

    // login 
    // -can type in both fields?  
    // - submittable
    // - user gets redirected to home on completion  
    // - its says logout
 



