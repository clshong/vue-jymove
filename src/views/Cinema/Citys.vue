<template>
  <div class="city">
    <div class="city-header">
      <div class="go-back" @click="goBack()">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
          alt=""
        />
        <div class="title">当前城市 - {{ location }}</div>
      </div>
      <van-search
        v-model="city"
        show-action
        placeholder="请输入搜索关键词"
        background="#f1f1f1"
        @search="searchCity"
      />
    </div>

    <div class="point">
      <h2>GPS定位你所在城市</h2>
      <div class="onecity" @click="chooseCity(location)">{{ location }}</div>
    </div>
    <div class="hotcity">
      <h2>热门城市</h2>
      <div class="hcity">
        <div class="onecity" @click="chooseCity('北京')">北京</div>
        <div class="onecity" @click="chooseCity('深圳')">深圳</div>
        <div class="onecity" @click="chooseCity('广州')">广州</div>
        <div class="onecity" @click="chooseCity('上海')">上海</div>
      </div>
    </div>
    <div class="clist">
      <van-index-bar :index-list="indexList" highlight-color="#ff0000">
        <template v-for="item in dataList">
          <van-index-anchor
            :index="item.index"
            :key="item.index"
            style="background:#eee"
          ></van-index-anchor>
          <van-cell
            v-for="(sub, key) in item.data"
            @click="chooseCity(sub.name)"
            :title="sub.name"
            :key="sub.name + key"
          />
        </template>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { cityListData } from "@/api/api";
import Vue from "vue";
import { Search, IndexBar, IndexAnchor, Cell } from "vant";
// 如果在多处使用到 需要将多处使用到的提到全局上
// import "vant/lib/index.css";
Vue.use(Search);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);

// 引入 bmap 百度地图
// import BMap from 'bmap'
import { loadBMap } from "../../tool/loadMap";

export default {
  data() {
    return {
      city: "",
      dataList: [],
      indexList: [],
      // 保存百度地图实例
      BMap: null,
      geolocation: null, // Geolocation对象实例
      location: "定位中", // 位置信息
    };
  },
  async created() {
    // 获取城市的列表数据
    let ret = await cityListData();
    this.dataList = ret[0];
    this.indexList = ret[1];
    this.eventBus.$emit("footernav", false);
  },
  mounted() {
    window.initBaiduMapScript = () => {
      this.BMap = window.BMap;
      this.getLocation();
    };
    loadBMap("initBaiduMapScript");
  },
  beforeDestroy() {
    this.eventBus.$emit("footernav", true);
  },
  methods: {
    // 获取选择的城市名称
    chooseCity: function(city) {
      // 初始化城市地址为 深圳
      let cityId = 440300
      // 在城市列表中匹配到对应的城市 ID
      this.dataList.forEach( item => {
        item.data.forEach(one => {
          if(one.name === city){
            cityId = one.cityId
          }
        })
      })
      console.log(city, cityId);
      this.$router.push("/cinema/"+cityId+"/"+city)
    },
    searchCity() {},
    // 获取城市地址
    // 获取地理定位
    getLocation() {
      this.location = "定位中";
      this.geolocation = new this.BMap.Geolocation();
      if (this.geolocation) {
        // 获取用户位置信息
        this.geolocation.getCurrentPosition(
          // 回调函数获取返回地址
          (position) => {
            this.location = position.address.city;
          },
          // 配置相关参数
          {
            enableHighAccuracy: true, // 要求浏览器获取最佳结果
            timeout: 30, //    超时时间
            maximumAge: 0, // 允许返回指定时间内的缓存结果。如果此值为0，则浏览器将立即获取新定位结果
          }
        );
      } else {
        this.location = "地址获取失败";
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss">
.city-header {
  .go-back {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    height: 50px;
    img {
      width: 30px;
      padding: 0 5px;
    }
    .title {
      width: 72%;
      text-align: center;
      font-size: 17px;
      color: #191a1b;
    }
  }
}

.point,
.hotcity {
  margin: 20px 20px 20px;
  h2 {
    font-size: 13px;
    color: #797d82;
    margin-bottom: 10px;
    font-weight: normal;
  }
  .onecity {
    height: 30px;
    background-color: #f4f4f4;
    line-height: 30px;
    border-radius: 3px;
    box-sizing: border-box;
    font-size: 14px;
    color: #191a1b;
    display: inline-block;
    padding: 0 10px;
    margin-right: 20px;
  }
}
</style>
