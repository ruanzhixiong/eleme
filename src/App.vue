<template>
  <div id="app">
      <Headers :seller = "seller"></Headers>
    <div class="tab">
      <div class="tab-item">
       <router-link to="/">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/ratings">评论</router-link>
       </div>
      <div class="tab-item">
       <router-link to="/seller">卖家</router-link>
      </div>
    </div>
    <transition name="fade">
    	 <keep-alive>
    			<router-view :seller = "seller"></router-view>
    	  </keep-alive>
    </transition>
    
  </div>
</template>

<script>
import Headers from './components/header/header'
export default {
  name: 'app',
  data(){
  	return{
  		seller:{}
  	}
  },
  components:{
    Headers,
  },
  created() {
		this.$http.get('/api/seller').then((response) => {
			if(response.body.errno === 0) {
				this.seller = response.body.data;
//				Bus.$emit("fromSeller", this.seller)
			}
		})
	}
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  height: 100%;
  /*background:#EBEBEB;*/
}
.tab{
  height: 40px;
  line-height: 40px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  border-bottom: 1px solid rgba(1,17,27,.1);
  background: #FFFFFF;
}
.tab .tab-item{
  flex-grow: 1;
  text-align: center;
  
}
.tab .tab-item a{
	display:block;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.tab .tab-item a{
  font-size: 14px;
  color: rgb(77, 85, 93);
}
.router-link-exact-active{
  color: rgb(240, 20 , 20) !important;
  padding: 0 !important;
}
.active{
	padding: 0 !important;
}
.fade-enter, .fade-leave-to 
 {
  opacity: 0;
}
</style>
