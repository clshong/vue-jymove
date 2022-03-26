<template>
  <div class="coming-soon">
    <FilmList :list="list" :key="'film' + list.length" :type="type"></FilmList>
  </div>
</template>

<script>
import { nowPlayingListData } from "@/api/api";
import FilmList from "@/components/FlimList";
export default {
  data() {
    return {
      page: 1,
      list: [],
      type: 1,
    };
  },
  components: {
    FilmList,
  },
  async created() {
    let ret = await nowPlayingListData(this.page);
    this.list = ret.data.data.films;
  },
};
</script>

<style lang="scss">
.coming-soon {
  padding-bottom: 50px;
}
</style>
