import React from 'react';
import PetfulApiService from '../../services/petful-api-service';
import './LandingPage.css';

class LandingPage extends React.Component {    
   async handleSubmit(e) {
        e.preventDefault();
        const { name } = e.target
        const newUser = {
          name: name.value,
        };
    
        localStorage.setItem('petful-user', JSON.stringify(newUser));
        await PetfulApiService.createUser(newUser);
        this.props.history.push('/adoptions')
      }
    
  render() {
    return (
      <section className='landing-page'>

        <div className='intro'>
          <h2> Welcome to Petful<span role='img' aria-label='emoji'> 🐾 </span></h2>
          <p>Petful is a cats and dogs shelter that gives you the opportunity to provide a loving home. You will be added to a line of people and must wait until it is your turn before selecting either a cat or dog for adoptation.</p>
          <p>
            As this shelter runs on a first in first out adoption policy, there is no browsing of animals. Animals that have been with us the longest will only be available for adoption.  In this way, we make sure all animals get a deserving home.
          </p>
          <p>Enter your name below to get started with the adoption process.</p>
        </div>

        <form action='#' id='js-user-form' onSubmit={(e) => this.handleSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='name'>Name: </label>
            <input type='text' name='name' id='name' required/>  
          </div>
          <div className='form-group cta'>
            <button type='submit' className='button primary full'>Start Adopting!</button>
          </div>
        </form>

      </section>
    );
  };
}
export default LandingPage;