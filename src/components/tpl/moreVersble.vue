<template>
	<ul class="portfolio-grid">
		<!-- <li class="animated flipInX"><router-link to="/reported"><i class="el-icon-remove"></i> 商品报损</router-link></li> -->
		<li class="animated flipInX"><router-link to="/classification"><i class="el-icon-d-caret"></i> 商品分类</router-link></li>
		<li class="animated flipInX"><router-link to="/purchaseHistory"><i class="el-icon-phone"></i> 采购申请</router-link></li>
		<li class="animated flipInX"><router-link to="/wareHistory"><i class="el-icon-view"></i> 商品入库</router-link></li>
		<!-- <li class="animated flipInX"><router-link to="/procurement"><i class="el-icon-phone"></i> 采购申请</router-link></li> -->
		<!-- <li class="animated flipInX"><router-link to="/warehousing"><i class="el-icon-view"></i> 扫码入库</router-link></li> -->
		<!-- <li class="animated flipInX"><router-link to="/"><i class="el-icon-phone-outline"></i> 调拨申请</router-link></li> -->
	</ul>
</template>
<script>
	export default{
		data(){
			return{}
		},
		methods:{}
	}
</script>
<style scoped>
	.portfolio-grid {
		list-style: none;
		padding: 0;
		margin: 0 auto;
		width: 100%;
	}

	.portfolio-grid li {
		display: inline-block;
		vertical-align: top;
		text-align: center;
		margin: 5px;
		background-color: rgb(235, 239, 247);
		width: 100px;
		height: 100px;
		line-height: 100px;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		-moz-transition: all 0.3s ease-in-out;
		-webkit-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
	}
	.portfolio-grid li a{
		display: block;
		text-decoration:none;
    	outline: none;
    	color: #878d99;
    	font-size: 15px
	}
	.portfolio-grid li:hover {
		border-radius: 50%;
		z-index: 9999;
	}
	.animated {
		-webkit-animation-duration: 1s;
		-moz-animation-duration: 1s;
		-o-animation-duration: 1s;
		animation-duration: 1s;
		-webkit-animation-fill-mode: both;
		-moz-animation-fill-mode: both;
		-o-animation-fill-mode: both;
		animation-fill-mode: both;
	}

	@-webkit-keyframes flipInX {
		0% {
			-webkit-transform: perspective(400px) rotateX(90deg);
			opacity: 0;
		}

		40% {
			-webkit-transform: perspective(400px) rotateX(-10deg);
		}

		70% {
			-webkit-transform: perspective(400px) rotateX(10deg);
		}

		100% {
			-webkit-transform: perspective(400px) rotateX(0deg);
			opacity: 1;
		}
	}

	@-moz-keyframes flipInX {
		0% {
			-moz-transform: perspective(400px) rotateX(90deg);
			opacity: 0;
		}

		40% {
			-moz-transform: perspective(400px) rotateX(-10deg);
		}

		70% {
			-moz-transform: perspective(400px) rotateX(10deg);
		}

		100% {
			-moz-transform: perspective(400px) rotateX(0deg);
			opacity: 1;
		}
	}

	@-o-keyframes flipInX {
		0% {
			-o-transform: perspective(400px) rotateX(90deg);
			opacity: 0;
		}

		40% {
			-o-transform: perspective(400px) rotateX(-10deg);
		}

		70% {
			-o-transform: perspective(400px) rotateX(10deg);
		}

		100% {
			-o-transform: perspective(400px) rotateX(0deg);
			opacity: 1;
		}
	}

	@keyframes flipInX {
		0% {
			transform: perspective(400px) rotateX(90deg);
			opacity: 0;
		}

		40% {
			transform: perspective(400px) rotateX(-10deg);
		}

		70% {
			transform: perspective(400px) rotateX(10deg);
		}

		100% {
			transform: perspective(400px) rotateX(0deg);
			opacity: 1;
		}
	}

	.flipInX {
		-webkit-backface-visibility: visible !important;
		-webkit-animation-name: flipInX;
		-moz-backface-visibility: visible !important;
		-moz-animation-name: flipInX;
		-o-backface-visibility: visible !important;
		-o-animation-name: flipInX;
		backface-visibility: visible !important;
		animation-name: flipInX;
	}	
</style>