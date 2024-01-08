<template>
  <div class="flex flex-center q-ma-md">
    <q-btn label="Get words" @click="onStartClick" :loading="loading"></q-btn>
  </div>
  <div class="column flex-center">
    <div class="flex" v-for="(word, index) in words" v-if="!loading">
      <div class="q-ma-md text-weight-bold">{{ word }}</div>
      <div class="column q-ma-md">
        <div v-if="synonyms[index].length" v-for="synonym in synonyms[index]">
          {{ synonym }}
        </div>
        <div v-else>no synonyms</div>
      </div>
      <div class="column q-ma-md">
        <div v-if="antonyms[index].length" v-for="antonym in antonyms[index]">
          {{ antonym }}
        </div>
        <div v-else>no antonyms</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const words = ref([]);
  const synonyms = ref([]);
  const antonyms = ref([]);
  const loading = ref(false);

  const onStartClick = async () => {
    loading.value = true;

    // получаем случайные слова
    const wordsResult = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5&number=5",
      {
        method: "GET",
      }
    );

    words.value = await wordsResult.json();

    synonyms.value = [];
    antonyms.value = [];
    // получаем синонимы и антонимы
    for (let word of words.value) {
      const thesaurusResult = await fetch(
        `https://api.api-ninjas.com/v1/thesaurus?word=${word}`,
        {
          method: "GET",
          // ключ API не стоит держать в репозитории
          headers: { "X-Api-Key": "8ResQV9cjNcLMisEQWVt8g==x92Uge0aLSlCW9wW" },
        }
      );
      const json = await thesaurusResult.json();
      synonyms.value.push(
        json.synonyms.length ? json.synonyms.slice(0, 3) : []
      );
      antonyms.value.push(
        json.antonyms.length ? json.antonyms.slice(0, 3) : []
      );
    }

    loading.value = false;
  };
</script>
