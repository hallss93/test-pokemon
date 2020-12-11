<template>
  <div class="tabs tabs-style-shape">
    <nav>
      <ul>
        <li>
          <a>
            <svg viewBox="0 0 80 60" preserveAspectRatio="none">
              <use xlink:href="#tabshape">
                <path
                  id="tabshape"
                  d="M80,60C34,53.5,64.417,0,0,0v60H80z"
                ></path>
              </use>
            </svg>

            <span></span>
          </a>
        </li>
        <li class="tab-current">
          <a>
            <svg viewBox="0 0 80 60" preserveAspectRatio="none">
              <use xlink:href="#tabshape"></use>
            </svg>
            <svg viewBox="0 0 80 60" preserveAspectRatio="none">
              <use xlink:href="#tabshape"></use>
            </svg>
            <span>#{{ pokemon.id }}</span>
          </a>
        </li>
        <li>
          <a>
            <svg viewBox="0 0 80 60" preserveAspectRatio="none">
              <use xlink:href="#tabshape"></use>
            </svg>
            <svg viewBox="0 0 80 60" preserveAspectRatio="none">
              <use xlink:href="#tabshape"></use>
            </svg>
            <span></span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="content-wrap">
      <section class="content-current">
        <h4>{{ pokemon.name }}</h4>
        <div class="poke-power">
          <span
            v-for="(at, atIndice) in pokemon.game_indices"
            :key="`attrS${atIndice}`"
            class="green"
            >{{ at.version.name }}</span
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Tab extends Vue {
  @Prop({ type: Object, default: {} }) readonly pokemon!: any;
}
</script>

<style scoped lang="scss">
@import "./../assets/scss/tab.scss";
</style>
