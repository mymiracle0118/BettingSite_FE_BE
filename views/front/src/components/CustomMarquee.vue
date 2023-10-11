<template>
    <div class="marquee" ref="marquee">
		<div class="marquee-inner">
			<div class="marquee-content" ref="marquee-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    mounted(){
		var marquee = this.$refs["marquee"]
		var marqueeInner = this.$refs["marquee-content"]
		this.marqueeInnerWidth = marqueeInner.offsetWidth 
		this.marqueeWidth = marquee.offsetWidth 
		this.marqueeLeft = marquee.offsetLeft

		// console.log(this.marqueeWidth, this.marqueeInnerWidth, this.marqueeLeft)
		if(this.marqueeInnerWidth > this.marqueeWidth){
			this.translate = this.marqueeWidth - this.marqueeInnerWidth
			this.translateLimit = (this.marqueeInnerWidth + this.marqueeLeft) * -1
			const self = this
			setInterval(() => {
				if(self.translate > self.translateLimit ){
					self.translate -= .2
					marqueeInner.style.transform = `translateX(${self.translate}px)`
				}
				else{
					self.translate = marquee.offsetWidth 
				}
			}, 1);
		}
    },
	data(){
		return{
			marqueeInnerWidth: '',
			marqueeWidth: '',
			marqueeLeft: '',
			translate: '',
			translateLimit: ''
		}
	},
	methods:{
		windowOffsetRight (ele) { 
			let rect = ele.getBoundingClientRect (); 
			let width = document.documentElement.getBoundingClientRect().width;
			return  width - ( rect.x + rect.width)
		}
	}
}
</script>

<style scoped>
	.marquee{
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	.marquee-inner {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.marquee-content {
		width: auto;
		height: 100%;
		display: inline-block;
		vertical-align: top;
	}
</style>