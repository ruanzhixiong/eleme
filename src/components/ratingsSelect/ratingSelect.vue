<template>
	<div class="rate-title">
		<span class="all"  @click="seclect(2)" :class="{'allOn':seclectType===2}">
			全部<span class="num">{{all.length}}</span>
		</span>
		<span class="good"  @click="seclect(0)" :class="{'goodOn':seclectType===0}">
			推荐<span class="num">{{good.length}}</span>
		</span>
		<span class="bad" @click="seclect(1)" :class="{'badOn':seclectType===1}">
			吐槽<span class="num">{{bad.length}}</span>
		</span>
	</div>
</template>
<script type="text/javascript">
const posi = 0;
const navi = 1;
export default {
	name: 'selects',
	props: ["rating"],
	data(){
		return{
			seclectType:2
		}
	},
	methods:{
		seclect(type){
			this.seclectType = type
			this.$emit('seclectsType',type)
		}
	},
	computed: {
		all() {
			return this.rating;
		},
		good() {
			let result = [];
			this.rating.forEach((item) => {
				if(item.rateType === posi) {
					result.push(item.rateType)
				}
			})
			return result;
		},
		bad() {
			let result = [];
			this.rating.forEach((item) => {
				if(item.rateType === navi) {
					result.push(item.rateType)
				}
			})
			return result;
		}
	}
}</script>
<style type="text/css" scoped>.rate-title {
	padding-top: 18px;
}

.rate-title span {
	display: inline-block;
	/*width: 36px;*/
	padding: 0 4px;
	height: 24px;
	line-height: 24px;
	font-size: 12px;
	text-align: center;
	border-radius: 2px;
	vertical-align: middle;
}

.all {
	background: rgba(0, 160, 220,.2);
	color: rgb(77, 85, 93);
}
.allOn{
	background: rgba(0, 160, 220,1);
	color: #fff;
}
.good {
	background: rgba(0, 160, 220, .2);
	color: rgb(77, 85, 93);
}
.goodOn{
	background: rgba(0, 160, 220,1);
	color: #fff;
}
.bad {
	background: rgba(77, 85, 93, .1);
	color: rgb(77, 85, 93);
}
.badOn{
	background: rgba(77, 85, 93, 1);
	color: #fff;
}
.num {
	font-size: 6px !important;
}</style>