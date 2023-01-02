<script lang="ts">
import sillabeOriginali from '@/json/sillabe';
import type { ParolaESillabe } from '@/json/sillabe';
import shuffle from '@/data/shuffle';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    let g: ParolaESillabe = { parola:'', sillabe:'' };
    return {
      parolaAttuale: g,
      sillabeUtente: '',
      so: sillabeOriginali,
      sillabeDaTestare: shuffle(sillabeOriginali)
    }
  },
  created() {
    this.aggiornaParola();
  },
  methods: {
    aggiornaParola() {
      if (this.sillabeDaTestare.length <= 0) {
        this.parolaAttuale.parola = 'Tutto testato.';
        return;
      }
      this.parolaAttuale = {
        parola: this.sillabeDaTestare[0].parola,
        sillabe: this.sillabeDaTestare[0].sillabe
      }
      this.sillabeUtente = '';
    },
    test(event: Event) {
      if (this.sillabeDaTestare.length <= 0) {
        this.parolaAttuale.parola = 'Tutto testato.';
        return;
      }
      if (this.sillabeUtente === this.sillabeDaTestare[0].sillabe) {
        // caso input utente giusto
        this.sillabeDaTestare.shift();
      }
      else {
        // caso input utente sbagliato
        let max = this.sillabeDaTestare.length > 5 ? 5 : this.sillabeDaTestare.length;
        let randomIndex = Math.floor(Math.random() * max) + 1;
        console.log(randomIndex);
        this.sillabeDaTestare.splice(randomIndex, 0, this.parolaAttuale);
        this.sillabeDaTestare.shift();
      }
      this.aggiornaParola();
    }
  }
})
</script>

<template>
  <main>
    <div class="form">
      {{ parolaAttuale.parola }} <br/>
      <input v-model.trim="sillabeUtente" @keyup.enter="test">
      <button @click="test">Test</button>
    </div>
    <div class="sillabe">
      {{ so }}
    </div>
    <div class="sillabe">
      {{ sillabeDaTestare }}
    </div>
  </main>
</template>

<style scoped>
.form {
  padding-top: 20px;
}
.sillabe {
  padding-top: 20px;
}
</style>