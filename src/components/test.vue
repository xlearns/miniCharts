<template>
	<div class="test">
		<canvas class="bar"></canvas>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Echars from "./index";

onMounted(() => {
	let options = {
		bgColor: "#fff",
		title: {
			text: "最近几个月各品类销售趋势图",
		},
		labels: ["6月", "7月", "8月", "9月", "10月"],
		datasets: [
			{
				label: "家电",
				data: [100, 278, 270, 190, 230],
			},
		],
		bottomPadding: 20,
		topPadding: 20,
		leftPadding: 40,
		rightPadding: 40,
		axisColor: "red",
	};
	let E = new Echars(".bar", options);
});
</script>

<style scoped>
.test {
	width: 100%;
	height: 100vh;
}
</style>
