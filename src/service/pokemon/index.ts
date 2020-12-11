import api from "./../index";

const url = {
  pokemon: "pokemon"
};

export default {
  getAllPokemons: async (page: any) => {
    try {
      return await api.get(`${url.pokemon}?offset=${page}&limit=20`);
    } catch (error) {
      return error;
    }
  },
  getPokemons: async (urlPokemon: any) => {
    try {
      return await api.get(urlPokemon);
    } catch (error) {
      return error;
    }
  }
};
