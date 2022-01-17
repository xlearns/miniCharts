<template>
	<canvas class="lineCharts"></canvas>
</template>

<script setup lang="ts">
function $(el: string) {
	return document.querySelector(el) as HTMLCanvasElement;
}
let oData = Array.from({ length: 6 }).map((v, i) => {
	return {
		value: (6 - i) * 10,
	};
});
let labels = ["一", "二", "三", "四", "五"];

import { onMounted, reactive, toRefs, withCtx } from "vue";
let state = reactive({
	data: oData as any,
	labels: labels,
	canvas: null,
	ctx: null,
});
const addData = function (ctx: any) {
	ctx.beginPath();
	for (var i = 0; i < state.data.length - 1; i++) {
		var dp = state.data[i].value;
		if (dp) {
			if (i != 0) {
				ctx.lineTo(55 + i * 100, 460 - dp * 4);
			}
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(55 + i * 100, 460 - dp * 4, 3, 0, 2 * Math.PI);
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(55 + i * 100, 460 - dp * 4);
		} else {
			ctx.beginPath();
		}
	}
};
const init = function () {
	let canvas: HTMLCanvasElement = $(".lineCharts");
	let ctx = canvas.getContext("2d") || null;
	if (!ctx) return;
	// 绘制背景
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, 500, 500);
	// 绘制轴线
	ctx.fillStyle = "black";
	ctx.lineWidth = 2.0;
	ctx.beginPath();
	ctx.moveTo(30, 10);
	ctx.lineTo(30, 460);
	ctx.lineTo(490, 460);
	ctx.stroke();
	// 绘制 Y轴 刻度值
	ctx.fillStyle = "black";
	for (var i = 0, l = state.data.length; i < l; i++) {
		// 绘制是 从上向下绘制的
		ctx.fillText(state.data[i].value, 4, i * 80 + 60);
		ctx.beginPath();
		ctx.moveTo(25, i * 80 + 60);
		ctx.lineTo(30, i * 80 + 60);
		ctx.stroke();
	}
	// 绘制 X 轴刻度
	// 添加刻个 从左向右绘制
	for (var i = 0, l = state.data.length; i < l; i++) {
		ctx.fillText(state.labels[i], 50 + i * 100, 475);
		ctx.beginPath();
		ctx.moveTo(55 + i * 100, 460);
		ctx.lineTo(55 + i * 100, 465);
		ctx.stroke();
	}

	//添加数据
	addData(ctx);
};
onMounted(() => {
	init();
});
</script>
