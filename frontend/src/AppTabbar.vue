<template>
  <v-ons-page :style="swipePosition">
    <custom-toolbar :style="swipeTheme" modifier="white-content" v-if="title=='Home'||'투어상품 검색'||'가이드 모집'">
      <div class="home_name" align="left">
        <ons-icon class="h1" icon="fa-plane-departure"></ons-icon>
        <a class="h1">MSG</a>
      </div>
      <!--<img slot="logo" src="./assets/logo4.png" height="44px" width="171px">-->
      <v-ons-toolbar-button slot="right" modifier="white-content"
                            @click="$store.commit('splitter/toggle')"
      >
        <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
      </v-ons-toolbar-button>
    </custom-toolbar>
    <custom-toolbar :style="swipeTheme" modifier="white-content" v-else>
      {{ title }}
      <v-ons-toolbar-button slot="right" modifier="white-content"
                            @click="$store.commit('splitter/toggle')"
      >
        <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
      </v-ons-toolbar-button>
    </custom-toolbar>

    <v-ons-tabbar position="auto"
                  swipeable
                  :modifier="md ? 'autogrow white-content' : ''"
                  :on-swipe="md ? onSwipe : null"
                  :tabbar-style="swipeTheme"
                  :tabs="tabs"
                  :index.sync="index"

    ></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  //    @postchange="showTip($event, 'Tip: Try swiping pages!')" 저기 tabbar 젤밑줄꺼 shut up 뜨는거
  import RecruitGuideSearch from './pages/GuideRecruitList.vue';
  import Home from './pages/Home.vue';
  import Toursearch from "./pages/Toursearch.vue";

  // Just a linear interpolation formula
  const lerp = (x0, x1, t) => parseInt((1 - t) * x0 + t * x1, 10);
  // RGB colors
  const red = [153, 102, 255];
  const blue = [153, 204, 255];
  const purple = [204, 153, 255];
  export default {
    data () {
      return {
        shutUp: !this.md,
        showingTip: false,
        colors: red,
        animationOptions: {},
        topPosition: 0,
        tabs: [
          {
            label: '투어상품 검색',
            icon: this.md ? null : 'ion-film-marker',
            page: Toursearch,
            theme: blue
          },
          {
            label: 'Home',
            icon: this.md ? null : 'ion-home',
            page: Home,
            theme: blue
          },
          {
            label: '가이드 모집',
            icon: this.md ? null : 'ion-edit',
            page: RecruitGuideSearch,
            theme: blue
          }
        ]
      };
    },

    methods: {
      onSwipe(index, animationOptions) {
        // Apply the same transition as ons-tabbar
        this.animationOptions = animationOptions;

        // Interpolate colors and top position
        const a = Math.floor(index), b = Math.ceil(index), ratio = index % 1;
        this.colors = this.colors.map((c, i) => lerp(this.tabs[a].theme[i], this.tabs[b].theme[i], ratio));
        this.topPosition = lerp(this.tabs[a].top || 0, this.tabs[b].top || 0, ratio);
      },
      // showTip(e, message) {
      //   if (!this.shutUp && !(e && e.swipe) && !this.showingTip) {
      //     this.showingTip = true;
      //     this.$ons.notification.toast({
      //       message,
      //       buttonLabel: 'Shut up!',
      //       timeout: 2000
      //     }).then(i => {
      //       this.shutUp = i === 0;
      //       this.showingTip = false;
      //     });
      //   }
      // }
    },

    computed: {
      index: {
        get() {
          return this.$store.state.tabbar.index;
        },
        set(newValue) {
          this.$store.commit('tabbar/set', newValue)
        }
      },
      title() {
        return this.md ? 'Onsen UI' : this.tabs[this.index].label;
      },
      swipeTheme() {
        return this.md && {
          backgroundColor: `rgb(${this.colors.join(',')})`,
          transition: `all ${this.animationOptions.duration || 0}s ${this.animationOptions.timing || ''}`
        }
      },
      swipePosition() {
        return this.md && {
          top: this.topPosition + 'px',
          transition: `all ${this.animationOptions.duration || 0}s ${this.animationOptions.timing || ''}`
        }
      }
    }
  };
</script>

<style>
  /* Custom 'white-content' modifier */
  .home_name{
    font-size: 40px;
    font-family: 바탕
  }
  .page--material .toolbar--white-content__center,
  .page--material .toolbar-button--white-content,
  .page--material :checked + .tabbar--white-content__button {
    color: white;
  }

  .page--material .tabbar--white-content__button {
    color: rgba(255, 255, 255, 0.7);
  }

  .page--material .tabbar--white-content__border {
    background-color: white;
  }
  .h1 {
    text-shadow: 0 1px 0 #ccc,
    0 2px 0 #c9c9c9,
    0 3px 0 #bbb,
    0 4px 0 #b9b9b9,
    0 5px 0 #aaa,
    0 6px 1px rgba(0,0,0,.1),
    0 0 5px rgba(0,0,0,.1),
    0 1px 3px rgba(0,0,0,.3),
    0 3px 5px rgba(0,0,0,.2),
    0 5px 10px rgba(0,0,0,.25),
    0 10px 10px rgba(0,0,0,.2),
    0 20px 20px rgba(0,0,0,.15);
  }
</style>
