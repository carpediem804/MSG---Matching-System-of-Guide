<template>
  <v-ons-page>
    <p class="intro">
      This is a kitchen sink example that shows off the Vue bindings for Onsen UI.<br><br>
    </p>

    <v-ons-card v-for="page of pages" :key="page.label"
      @click="push(page.component, page.label)"
    >
      <div class="title">{{ page.label }}</div>
      <div class="content">{{ page.desc }}</div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import PullHook from './PullHook.vue';
import Dialogs from './Dialogs.vue';
import Buttons from './Buttons.vue';
import Carousel from './Carousel.vue';
import InfiniteScroll from './InfiniteScroll.vue';
import Progress from './Progress.vue';
import Yong from './Yong.vue';
import hyunho from './Toursearch.vue';

export default {
  data () {
    return {
      pages: [
        {
          component: Yong,
          label: '가이드 모집하기',
          desc: '내가 원하는 장소, 원하는 시간에 가이드를 모집할 수 있습니다.'
        },
        {
          component: Yong,
          label: '투어 상품 찾기',
          desc: '가이드들의 풍부한 경험을 바탕으로 계획된 투어 상품들을 만나 보실 수 있습니다.'
        },
        // {
        //   component: PullHook,
        //   label: 'Pull Hook',
        //   desc: 'Simple "pull to refresh" functionality to update data.'
        // },
        // {
        //   component: Dialogs,
        //   label: 'Dialogs',
        //   desc: 'Components and utility methods to display many types of dialogs.'
        // },
        // {
        //   component: Buttons,
        //   label: 'Buttons',
        //   desc: 'Different styles for buttons, floating action buttons and speed dials.'
        // },
        // {
        //   component: Carousel,
        //   label: 'Carousel',
        //   desc: 'Customizable carousel that can be optionally fullscreen.'
        // },
        // {
        //   component: InfiniteScroll,
        //   label: 'Infinite Scroll',
        //   desc: 'Two types of infinite lists: "Load More" and "Lazy Repeat".'
        // },
        // {
        //   component: Progress,
        //   label: 'Progress',
        //   desc: 'Linear progress, circular progress and spinners.'
        // }
        {
             component: hyunho,
             label: 'hyunho',
             desc: 'hyunho example'
        }
      ]
    };
  },

  methods: {
    push(page, key) {
      this.$store.commit('navigator/push', {
        extends: page,
        data() {
          return {
            toolbarInfo: {
              backLabel: 'Home',
              title: key
            }
          }
        }
      });
    }
  }
};
</script>

<style>
.intro {
  text-align: left;
  padding: 0 22px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(0, 0, 0, .54);
}

ons-card {
  cursor: pointer;
  color: #333;
}

.card__title, .card--material__title {
  font-size: 20px;
}
</style>
