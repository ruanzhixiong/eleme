<template>
	<div class="addfoods">
		<transition name="count">
			<span class="sub icon-remove_circle_outline" 				
				v-show="food.count>0" 
				@click.stop="subCount()">
			</span>
		</transition>		
		<span class="countNum" v-show="food.count>0">{{food.count}}</span>
		<span class="inc icon-add_circle" @click.stop="incCount()" ref="add"></span>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	export default {
		name: 'add',
		props: ["food"],
			//重父组件获取数据
		methods: {
			subCount() {
				if(this.food.count<1){
					return false;
				}
				this.food.count--;
//				console.log(this.food.count);
			},
			incCount() {	
//				console.log(this.$refs.add.getBoundingClientRect().bottom)
				if(!this.food.count) {
					//设置对象属性，要引入一个空的vue的实例
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}	
			}
		}
	}
</script>
<style type="text/css">
	.addfoods {
		position: absolute;
		right: 0;
		bottom: 18px;
	}
	
	.sub,
	.inc {
		display: inline-block;
		font-size: 28px;
		line-height: 24px;
		color: cornflowerblue;
	}
	
	.countNum {
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		font-size: 12px;
		width: 12px;
		text-align: center;
	}
	.count-enter-active,.count-leave-active{
		transition: all .5s;
	}
	.count-enter,.count-leave-to{
		opacity: 0;
		transform: translate3D(26px,0,0) rotate(180deg);
	}
</style>