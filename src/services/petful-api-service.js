import config from '../config';

const PetfulApiService = {
    async listUsers(){
    //fetch all users
    },
    async createUser(user) {
    //use POST method to create a user 
    },
    async fetchAnimals() {
    //fetch all animals
    },
    
    async fetchAnimal(animal) {
    //fetch a single animal
    },
    
    async adopt(animal) {
    //use DELETE to delete an animal upon adopting
    },
    
    async refreshUsers() {
    //refresh user list upon adoption

    },
}
export default PetfulApiService;