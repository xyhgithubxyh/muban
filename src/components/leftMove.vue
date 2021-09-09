<style lang="less">
@import '../assets/style/leftMove.less';
.top {
  padding: 15px;
  font-size: 35px;
  display: flex;
  justify-content: space-between;
}
.img {
  width: 48px;
  height: 48px;
  position: relative;
  img {
    width: 100%;
  }
}
.isSee {
  position: absolute;
  top: 3px;
  right: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #dd140d;
}
.slid{
  width: 300%;
  height: 100px;
  display: flex;
  
}
</style>

<template>
  <div>
    <div style="width:100%;overflow:auto">
      <div class="slid" id="ID">
      <div style="background:red;height:100px;flex: 1;"></div>
      <div style="background:blue;height:100px;flex: 1;"></div>
      <div style="background:yellow;height:100px;flex: 1;"></div>
    </div>
    </div>
  
    <div class="top">
      <span>上午好</span>
      <div class="img" @click="toMsg">
        <img src="../assets/images/tz.svg" alt="" />
        <div class="isSee"></div>
      </div>
    </div>

    <div class="shopping_page" data-touchmove-con>
      <div class="header bd_bottom">左滑删除</div>
      <div
        class="production_list"
        v-for="(item, index) in productionList"
        :key="index + 'a'"
        ref="touchmove"
        v-leftMove="{ container: '[data-touchmove-con]' }"
      >
        <div class="item_box bd_bottom">
          <span>型号：</span> <span>{{ item.productionNmae }}</span>
        </div>
        <div class="item_box">
          <span>数量：</span> <span>{{ index }}</span>
        </div>
        <div class="delete_item" @click="deleteItem(index)">删除</div>
      </div>
      <div class="continueAdd" @click="addShort">
        <div style="padding-bottom: 15px" class="bd-bottom">
          <i class="icon-tianjiax iconfont"></i> <span>继续添加</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      productionList: [
        {
          productionNmae: 'iPhone X'
        },
        {
          productionNmae: 'iPhone XR'
        },
        {
          productionNmae: 'iPhone XS'
        },
        {
          productionNmae: 'iPhone XS Max'
        }
      ]
    }
  },
  methods: {
    toMsg(){
     let j = document.getElementById("ID");
      j.style.transform="translateX(-33.33%)"
        // context.launchStage('main.srMessageNotify')
    },
    // 继续添加
    addShort() {
      var addObj = { productionNmae: '商品' + this.productionList.length }
      this.productionList.push(addObj)
    },
    // 删除当前机型
    deleteItem(ind) {
      if (this.$refs['touchmove'][ind]) {
        this.$refs['touchmove'][ind].style.transform = 'translateX(0px)'
      }
      this.productionList.splice(ind, 1)
    }
  }
}
</script>
