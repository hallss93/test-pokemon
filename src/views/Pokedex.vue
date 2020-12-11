<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div
      class="pokedex-container"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <div
        v-for="(pokemon, index) in PokeFormated"
        :key="index"
        class="pokedex-card"
        :id="`card-${index}`"
        @click="changeCard(index)"
      >
        <div class="poke-body poke-body--front">
          <div class="pokemon">
            <img alt="Vue logo" :src="changeImage(pokemon.id)" />
          </div>
          <div>
            <Tab :pokemon="pokemon" />
          </div>
        </div>
        <div class="poke-body poke-body--back">
          <div class="card-body"></div>
          <div class="span-title">
            <div class="span-body">
              <h6 class="title">height</h6>
              <h4 class="value">{{ pokemon.height }}</h4>
            </div>
            <div class="span-body">
              <h6 class="title">species</h6>
              <h4 class="value">{{ pokemon.species.name }}</h4>
            </div>
          </div>
          <h3 class="h3-title">Abilities</h3>
          <table>
            <thead>
              <tr>
                <th>Ability</th>
                <th>Hidden</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(abilities, abilitiesIndex) in pokemon.abilities"
                :key="`abilities-${abilitiesIndex}`"
              >
                <td>
                  <span>
                    {{ abilities.ability.name }}
                  </span>
                </td>
                <td>{{ abilities.is_hidden }}</td>
              </tr>
            </tbody>
          </table>

          <h3 class="h3-title">Stats</h3>
          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Base Stat</th>
                <th>Effort</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(stats, statsIndex) in pokemon.stats"
                :key="`stats-${statsIndex}`"
              >
                <td>
                  <span>
                    {{ stats.stat.name }}
                  </span>
                </td>
                <td>{{ stats.base_stat }}</td>
                <td>{{ stats.effort }}</td>
              </tr>
            </tbody>
          </table>

          <h3 class="h3-title">Moves</h3>
          <table>
            <thead>
              <tr>
                <th>Move</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(move, moveIndex) in pokemon.moves"
                :key="`special-move-${moveIndex}`"
              >
                <td>{{ move.move.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { Pokemon } from "./../schemas/Pokemon";
import PokemonService from "@/service/pokemon";

import Tab from "@/components/Tab.vue";

/**
 * Component registration and ordering with Apollo
 */
@Component({
  components: { Tab }
})
export default class Pokedex extends Vue {
  busy = false;
  page = 0;
  PokeList: Array<any> = [];
  PokeAll: Array<Pokemon.Pokemon> = [];
  PokeFormated: Array<Pokemon.Pokemon> = [];

  /**
   * @description This method rotate current card   *
   *
   * @param {number} index   Index of Card used like ID
   */
  @Emit()
  changeCard(index: number) {
    const cardFront = document.querySelector(
      `#card-${index} .poke-body.poke-body--front`
    );
    if (cardFront) cardFront.classList.toggle("hidden");
    const card = document.querySelector(`#card-${index}`);
    if (card) card.classList.toggle("is-flipped");
  }

  /**
   * @description This method is necessary for use alternative image PNG.
   * The Image that come in API is JPG without background transparent.
   *
   *
   * @param {number} number   Number ID of Pokemon
   */
  @Emit()
  changeImage(number: number) {
    const text =
      number < 10 ? `00${number}` : number < 100 ? `0${number}` : number;
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${text}.png`;
  }

  loadMore() {
    this.page = this.page + 20;
    this.getPokemons();
  }

  getPokemons() {
    this.busy = true;
    PokemonService.getAllPokemons(this.page).then(({ data }) => {
      this.PokeList = this.PokeList.concat(data.results);
      const promises: any = [];
      data.results.map((e: any) => {
        promises.push(
          new Promise((resolve, reject) => {
            PokemonService.getPokemons(e.url).then(({ data: pokemon }) => {
              console.log(pokemon);
              resolve(pokemon);
            });
          })
        );
      });
      Promise.all(promises).then(res => {
        this.busy = false;
        this.PokeFormated = this.PokeFormated.concat(
          res as Array<Pokemon.Pokemon>
        );
      });
    });
  }

  created() {
    this.getPokemons();
  }
}
</script>

<style scoped lang="scss">
@import "./../assets/scss/pokedex.scss";
@import "./../assets/scss/cardAnimate.scss";
@import "./../assets/scss/table.scss";
</style>
