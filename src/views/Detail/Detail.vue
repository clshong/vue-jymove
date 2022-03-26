<template>
  <div>
    <div class="film-header">
      <div class="goBack" @click="goBack()">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
          alt=""
        />
      </div>
    </div>
    <div class="detail">
      <div class="img">
        <!-- <img v-lazy="film.poster"/> -->
        <img :style="{ backgroundImage:'url('+film.poster+')',backgroundSize: 'cover' }" />
      </div>
      <div class="film-detail">
        <div>{{ film.name }}</div>
        <div>{{ film.category }}</div>
        <div>{{ film.premiereAt | parsePremiereAt }}上映</div>
        <div>{{ film.nation }} | {{ film.runtime }} 分钟</div>
        <div>
          {{ film.synopsis }}
        </div>
      </div>
      <Swiper :key="'actors_' + film.actors.length">
        <div v-for="(item, index) in film.actors" :key="index" class="swiper-slide">
          <div>
            <img :src="item.avatarAddress" alt="" />
          </div>
        </div>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { moiveDetailData } from "@/api/api";
import moment from "moment";
import Swiper from "@/components/Swiper";
export default {
  data() {
    return {
      film: {
        actors: [],
      },
    };
  },
  components: {
    Swiper,
  },
  async created() {
    let ret = await moiveDetailData(this.$route.params.filmId);
    this.film = ret.data.data.film;
    this.eventBus.$emit("footernav", false);
  },
  beforeDestroy() {
    this.eventBus.$emit("footernav", true);
  },
  filters: {
    parsePremiereAt: function (value) {
      // 时间戳的单位是秒，需要乘以1000转化成毫秒进行处理
      return moment(value * 1000).format("YYYY年MM月DD日");
    },
  },
  methods: {
    // 返回上一页
    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.film-header {
  position: fixed;
  background-color: hsla(0, 0%, 100%, 0);
  color: transparent;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  width: 100vw;
  height: 44px;
  z-index: 1;

  .goBack img {
    width: 30px;
    margin-top: 5px;
    margin-left: 5px;
  }
}
.detail {
  .img {
    width: 100%;
    height: 520px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-slide {
    img {
      width: 80px;
    }
  }
}
</style>
