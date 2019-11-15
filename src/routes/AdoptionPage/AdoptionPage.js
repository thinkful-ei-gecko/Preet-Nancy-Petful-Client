import React from 'react';
import PetfulApiService from '../../services/petful-api-service';
import './AdoptionPage.css';


class AdoptionPage extends React.Component {
    state = {
        users: [],
        dog: {},
        cat: {},
        recentlyAdopted: [],
        counter: 0,
        intervalId: null
      }
    
      async componentDidMount() {
        //const userReq = PetfulApiService.listUsers();
        const animalReq = PetfulApiService.fetchAnimals();
    
        const [users, animals] = await Promise.all([ animalReq])//userReq,
    
        const intervalId = setInterval(() => {
          this.adopt('dog');
        }, 10000)
    
        this.setState({
          users,
          dog: animals.dog,
          cat: animals.cat,
          intervalId
        })
      }
    
      async componentDidUpdate(prevProps, prevState) {
        if (prevState.users.length !== 0 && this.state.users.length === 0) {
          const newUsers = await PetfulApiService.refreshUsers();
          this.setState({ users: newUsers })
        }
      }
    
      adopt = async(animal) => {
        const response = await PetfulApiService.adopt(animal)
        const newAnimal = await PetfulApiService.fetchAnimal(animal)
    
        this.setState({
          recentlyAdopted: [response, ...this.state.recentlyAdopted],
          [animal]: newAnimal[animal],
          users: this.state.users.slice(1),
          counter: this.state.counter + 1
        }, this.cancelInterval)
      }
    
      cancelInterval = () => {
        const { counter } = this.state;
        if (counter >= 4) {
          clearInterval(this.state.intervalId)
        }
      }
    
      renderUsers = (users) => {
        return users.map((user, i) => {
          return <div className={(i === 0 ? 'user active' : 'user')} key={i}>
            <h4>{user.name}</h4>
          </div>
        })
      }
    
      renderAnimal = (animal) => {
        return (<div className='animal'>
          <img src={animal.photo} alt='animal-profile-img' className='responsive'></img>
          <h2>Name: {animal.name}</h2>
          <p>Size: {animal.size}</p>
          <p>Gender: {animal.gender}</p>
          <p>Description: {animal.description}</p>
        </div>);
      }
    
      renderRecentlyAdopted = () => {
        return (
          this.state.recentlyAdopted.map((result, i) => {
            return <div className='adopted' key={i}>
              <p>{result.user.name} adopted {result.animal.name}</p>
            </div>
          })
        )
      }
    
      allowedToAdopt = () => {
        const userObj = localStorage.getItem('petful-user');
        const name = JSON.parse(userObj).name;
    
        if (this.state.users.length) {
          return this.state.users[0].name !== name
        }
        return false;
      }

    render(){
        const { users, dog, cat } = this.state;
        return (
            <section className='adoptions-page'>
                <div className='users-wrapper'>
                    <h2>User Line:</h2>
                        {this.renderUsers(users)}   
                </div>

                <div className='animals'>
                    <h2>Up Next to Adopt: </h2>
                    <div className='animal-wrapper'>
                        <div className='dog-queue'>
                            {this.renderAnimal(dog)}
                            <button className='button primary' onClick={() => this.adopt('dog')} disabled={this.allowedToAdopt()}>Adopt</button>
                         </div>
                        <div className='cat-queue'>
                            {this.renderAnimal(cat)}
                            <button className='button primary' onClick={() => this.adopt('cat')} disabled={this.allowedToAdopt()}>Adopt</button>
                        </div>
                    </div>
                </div>

                <div className='recently-adopted'>
                    <h2>Recently Adopted: </h2>
                <div className='adopted-wrapper'>
                    {this.renderRecentlyAdopted()}
                </div>
                </div>
            </section>
        );
    };
}
export default AdoptionPage;


