<template>
	<div class="star">
		<span 
			v-for="(item,index) in itemClasses" 
			class='star-item' 
			:class='item'
			:style="{width:itemWidth+'px',height:itemWidth+'px'}"></span>
	</div>
</template>
<script type="text/javascript">
	const lents=5;
	const on ="on";
	const half = "half";
	const off = 'off'
	export default {
		name:'star',
		props:["score","itemWidth"],
		computed:{
			itemClasses:function() {
				let result=[];
				let score = Math.floor(this.score*2)/2;
				let xiaoshu = score%1 !==0;
				let ints = Math.floor(score);
				for (let i=0;i<ints;i++) {
					result.push(on);
				}
				if (xiaoshu) {
					result.push(half)
				}
				while(result.length<lents){
					result.push(off)
				}
				return result;
			}
		}
	}
</script>
<style type="text/css">
	.star{
		display: inline-block;
	}
	.star-item{
		display: inline-block;
		background-repeat: no-repeat;
		margin-right: 8px;
	}
	.star-item:last-child{
		margin-right: 0;
	}
	.on{
		background-image: url("../../assets/staron.png");
		background-size: 100%;
	}
	.half{
		background-image: url("../../assets/starhalf.png");
		background-size: 100%;
	}
	.off{
		background-image: url("../../assets/staroff.png");
		background-size: 100%;
	}
</style>