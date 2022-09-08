<script setup>
import '@/style/global/main.scss'

</script>

<template>
       <div class="movie1"> {{ film.kinopoiskId }}
            <img :src="film.posterUrlPreview" :alt="film.nameRu" class="movie__cover1" />
          <div class="movie__info">
            <div class="movie__t">Thor: Love and Thunder {{film.nameRu}}  </div>
            <p class="modal__year"> {{film.year}} </p>
          <div class="movie__c" v-for="(genre) in item.genres"> Fantasy  {{ genre.genre }}</div>
            <div class="movie__average movie__average--green">6.4</div>
          </div>
        </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      out: '',
      simbol: '',
      restaurants: [],
      error: null,
      headers: {'Content-Type': 'application/json', "X-API-KEY": '8c8e1a50-6322-4135-8875-5d40a5420d86'},
    }
  },
  methods: {
    async popular() {
      await this.filter('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS')
    },
    async Serch() {
      await this.filter('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=')
    },
    async Details() {
      await this.filter('https://kinopoiskapiunofficial.tech/api/v2.2/films/')
    },
    async FilterGenres(genreId) {
      await this.filter('https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=' + genreId)
    },
    async filter(api) {
      try {
        const response = await fetch(api, {
          method: 'GET',
          headers: this.headers,
        }).then(this.checkStatus)
            .then(this.parseJSON);
        console.log(response)
       
        this.restaurants = response.items
      } catch (error) {
        this.error = error
      }
    },
    parseJSON: function (resp) {
      return (resp.json ? resp.json() : resp);
    },
    checkStatus: function (resp) {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }
      return this.parseJSON(resp).then((resp) => {
        throw resp;
      });
    },
          onChange(event) {
            this.simbol = event.target.value
            console.log(event.target.value)
           this.FilterGenres(event.target.value)
        },
  async mounted () {
    try {
      const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS', {
        method: 'GET',
        headers: this.headers,
      }).then(this.checkStatus)
          .then(this.parseJSON);
      console.log(response)

      this.restaurants = response.films
    } catch (error) {
      this.error = error
    }
  },
  
}
}
</script>

