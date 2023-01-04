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
      sillabeDaTestare: shuffle(sillabeOriginali),
      isCorretto: true,
      showRisultato: false
    }
  },
  created() {
    this.aggiornaParolaAttuale();
  },
  methods: {
    aggiornaSillabeDaTestare() {
      if (this.isCorretto) {
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
    },
    aggiornaParolaAttuale() {
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
    verifica(event: Event) {
      if (this.sillabeDaTestare.length <= 0) {
        return;
      }
      this.isCorretto = this.sillabeUtente === this.sillabeDaTestare[0].sillabe;
      this.showRisultato = true;
    },
    next() {
      this.aggiornaSillabeDaTestare();
      this.aggiornaParolaAttuale();
      this.showRisultato = false;
    }
  }
})
</script>

<template>
  <main>
    <div class="form">
      {{ parolaAttuale.parola }} <br/>
      <input v-model.trim="sillabeUtente" @keyup.enter="verifica">
      <button @click="verifica">Verifica</button>
    </div>
    <div class="risultato" v-show="showRisultato">
      <div class="corretto" v-show="isCorretto">
        Giusto
      </div>
      <div class="sbagliato" v-show="!isCorretto">
        La risposta giusta è {{ parolaAttuale.sillabe }}
      </div>
      <button @click="next">Next</button>
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
.sbagliato {
  color: red;
}

.corretto {
  color: green;
}
</style>