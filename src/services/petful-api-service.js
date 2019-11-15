import config from '../config';

const PetfulApiService = {
    // async listUsers(){
    //     const res = await fetch (`${config.API_ENDPOINT}/users`)
    //     if(!res.ok){
    //         res.json().then(e => Promise.reject(e))
    //     }
    //     return res.json();
    // },
    // async createUser(user) {
    //     const res = await fetch(`${config.API_ENDPOINT}/users`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(user)
    //     })
    //     if (!res.ok) {
    //       res.json().then(e => Promise.reject(e))
    //     }
    //     return res.json();
    // },
    async fetchAnimals() {
        const res = await fetch(`${config.API_ENDPOINT}`)
        if (!res.ok) {
          res.json().then(e => Promise.reject(e))
        }
        return res.json();
    },
    async fetchAnimal(animal) {
        const res = await fetch(`${config.API_ENDPOINT}/${animal}`)
        if (!res.ok) {
          res.json().then(e => Promise.reject(e))
        }
        return res.json();
    },
    // async adopt(animal) {
    //     const res = await fetch(`${config.API_ENDPOINT}/adoptions/${animal}`, {
    //       method: 'DELETE'
    //     })
    //     if (!res.ok) {
    //       res.json().then(e => Promise.reject(e))
    //     }
    //     return res.json();
    // },
    // async refreshUsers() {
    //     const res = await fetch(`${config.API_ENDPOINT}/users/refresh`)
    //     if (!res.ok) {
    //       res.json().then(e => Promise.reject(e))
    //     }
    //     return res.json();
    // },

}
export default PetfulApiService;