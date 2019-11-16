import config from '../config';

const PetfulApiService = {
  async listUsers() {
    const res = await fetch(`${config.API_ENDPOINT}/adoptor`)
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },
  async createUser(user) {
    const res = await fetch(`${config.API_ENDPOINT}/adoptor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },
  async fetchAnimals(animal) {
      const res = await fetch(`${config.API_ENDPOINT}/${animal}`)
      if (!res.ok) {
        res.json().then(e => Promise.reject(e))
      }
      return res.json();
  },
  async fetchDog() {
    // console.log('fetching dog')
    const res = await fetch(`${config.API_ENDPOINT}/dog`)
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },
  async fetchCat() {
    const res = await fetch(`${config.API_ENDPOINT}/cat`)
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },
  async adopt(animal) {
    // console.log('making adopt call')
    const res = await fetch(`${config.API_ENDPOINT}/${animal}`, {
      method: 'DELETE'
    })
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },
  async refreshUsers() {
    console.log('getting users from endpoint/adoptor')
    const res = await fetch(`${config.API_ENDPOINT}/adoptor`)
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },

}
export default PetfulApiService;