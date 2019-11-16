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
        const userReq = PetfulApiService.listUsers();
        const catReq = PetfulApiService.fetchCat();
        const dogReq = PetfulApiService.fetchDog();
    
        const [users, cat, dog ] = await Promise.all([userReq, catReq, dogReq])//
        // console.log('in component did mount', users)

        const intervalId = setInterval(() => {
          this.adopt('dog');
        }, 10000)
    
        this.setState({
          users: users.adoptorsLine,
          dog: dog.dog,
          cat: cat.cat,
          intervalId
        })
      }
    
      async componentDidUpdate(prevProps, prevState) {
        console.log('in componeneDidUpdate')
        if (prevState.users.length !== 0 && this.state.users.length === 0) {
          const newUsers = await PetfulApiService.refreshUsers();
          this.setState({ users: newUsers })
        }
      }
    
      adopt = async(animal) => {
        // console.log('in adopt, adopting a', animal)
        const response = await PetfulApiService.adopt(animal)
        const newAnimal = await PetfulApiService.fetchAnimals(animal)
        const newUsers = await PetfulApiService.listUsers()
    
        this.setState({
          recentlyAdopted: response.adoptedList,
          [animal]: newAnimal[animal],
          users: newUsers.adoptorsLine,
          counter: this.state.counter + 1
        }, this.cancelInterval)
      }
    
      cancelInterval = () => {
        
        const { counter } = this.state;
        if (counter >= 4) {
          console.log('clearing interval')
          clearInterval(this.state.intervalId)
        }
      }
    
      renderUsers = (users) => {
        console.log(users);
        return users.map((user, i) => {
          return <div className={(i === 0 ? 'user active' : 'user')} key={i}>
            <h4>{user}</h4>
          </div>
        })
      }
    
      renderCat = (animal) => {
        
        return (<div className='animal'>
          <img src={animal.imageURL} alt='animal-profile-img' className='responsive'/>
          <h3>Name: {animal.name}</h3>
          <p>Breed: {animal.breed}</p>
          <p>Gender: {animal.sex}</p>
          <p>Story: {animal.story}</p>
        </div>);
      }

      renderDog = (animal) => {
        return (<div className='animal'>
          <img src={animal.imageURL} alt='animal-profile-img' className='responsive'/>
          <h3>Name: {animal.name}</h3>
          <p>Breed: {animal.breed}</p>
          <p>Gender: {animal.sex}</p>
          <p>Story: {animal.story}</p>
        </div>);
      }
    
      renderRecentlyAdopted = () => {
        return (
          this.state.recentlyAdopted.map((result, i) => {
            return <div className='adopted' key={i}>
              <p>{/*result.name*/} {result.name}</p>
            </div>
          })
        )
      }
    
      allowedToAdopt = () => {

        console.log('checking user')
        const userObj = localStorage.getItem('petful-user');
        const name = JSON.parse(userObj).name;
        console.log(name)
        if (this.state.users.length) {
          return this.state.users[0].name !== name
        }
        return false;
      }

    render(){
      console.log(this.state)
        const { users, dog, cat } = this.state;
        return (
            <section className='adoptions-page'>
                <div className='users'>
                    <h4>User Line:</h4>
                        {this.renderUsers(users)}   
                </div>

                <div className='animals'>
                    <h2>Up Next to Adopt: </h2>
                    <div className='animal-wrapper'>
                        <div className='dog-queue'>
                            {this.renderDog(dog)}
                            <button className='button primary' onClick={() => this.adopt('dog')} /*disabled={this.allowedToAdopt()} */>Adopt</button>
                         </div>
                        <div className='cat-queue'>
                            {this.renderCat(cat)}
                            <button className='button primary' onClick={() => this.adopt('cat')} /*disabled={this.allowedToAdopt()}*/>Adopt</button>
                        </div>
                    </div>
                </div>

                <div className='recently-adopted'>≈
                    <h4>Recently Adopted: </h4>
                <div className='adopted-wrapper'>
                    {this.renderRecentlyAdopted()}
                </div>
                </div>
            </section>
        );
    };
}
export default AdoptionPage;


