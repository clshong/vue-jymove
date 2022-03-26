<template>
  <div class="cinema">
    <div class="theader">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
        alt=""
        @click="goBack"
      />
      <div class="title">电影院</div>
      <div class="city-btn" @click="gotoUrl">
        {{ $route.params.cname || "深圳市" }}
      </div>
    </div>

    <div class="clist">
      <div
        class="cineam"
        v-for="(item, index) in cinemasList"
        :key="'P1' + index"
      >
        <div class="line">
          <p class="name">{{ item.name }}</p>
          <p class="price">￥ {{ item.lowPrice | formatPrice }} 起</p>
        </div>
        <div class="line">
          <p class="address">{{ item.address.length > 20 ? item.address.slice(0,20)+'...' :  item.address }}</p>
          <p class="distance">{{ item.Distance | formatDistance}} km</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cinemasList } from "@/api/api";
export default {
  data() {
    return {
      // 电影院列表
      cinemasList: [],
    };
  },
  async created() {
    console.log(this.$route.params.cid);
    // 如果直接点底部的影院没有传递对应的城市定位，跳转到城市定位模块
    if (!this.$route.params.cid) {
      this.$router.push("/citys");
      return;
    }
    let cinemas = await cinemasList(this.$route.params.cid);
    this.cinemasList = cinemas.data.data.cinemas;
  },
  methods: {
    // 跳转到上一个路由
    goBack() {
      this.$router.go(-1);
    },
    // 跳转到指定路由
    gotoUrl() {
      this.$router.push("/citys");
    },
  },
  filters:{
      formatPrice(val){
          return (val/100).toFixed(1);
      },
      formatDistance(val){
        return val.toFixed(2);
      }
  }
};
</script>

<style lang="scss" scoped>
.theader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: #f2f2f2;
  img {
    width: 28px;
    margin-left: 20px;
  }
  .title {
    color: #666;
  }
  .city-btn {
    margin-right: 20px;
    color: #555;
    background: #ddd;
    padding: 3px 10px;
  }
}
.clist {
  .cineam {
    padding: 15px;
    border-bottom: 1px solid #eee;
    .line{
        height: 24px;
    }
    .name {
      color: #191a1b;
      font-size: 15px;
      float: left;
    }
    .price {
      color: #ff5f16;
      font-size: 10px;
      float: right;
    }
    .address {
      color: #797d82;
      font-size: 12px;
      margin-top: 5px;
      float: left;
    }
    .distance {
      color: #797d82;
      font-size: 12px;
      margin-top: 5px;
      float: right;
    }
  }
}
</style>
