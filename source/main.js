const wcClockTemplate = document.createElement("template");
wcClockTemplate.shadowRootMode = "open";
wcClockTemplate.innerHTML = String.raw`
	<style>
		:host(wc-clock) {
			display: inline-block;
			font-family: sans-serif;
			font-weight: bold;
			font-size: 1rem;
		}

		.wc-clock__border {
			position: relative;
			aspect-ratio: 1 / 1;
			width: auto;
			height: 10em;
			border-radius: 50%;
			background: black;
			user-select: none;
		}

		.wc-clock__face {
			position: absolute;
			inset: 0.25em;
			aspect-ratio: 1 / 1;
			border-radius: 50%;
			background: white;
		}

		.wc-clock__label {
			position: absolute;
			font-size: 1em;
			text-align: center;
			vertical-align: middle;
			line-height: 1;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 1em;
			pointer-events: none;
		}

		.wc-clock__label__1 {
			transform: translate(25%, -43%);
		}

		.wc-clock__label__2 {
			transform: translate(43%, -25%);
		}

		.wc-clock__label__3 {
			transform: translate(50%, 0);
		}

		.wc-clock__label__4 {
			transform: translate(43%, 25%);
		}

		.wc-clock__label__5 {
			transform: translate(25%, 43%);
		}

		.wc-clock__label__6 {
			transform: translate(0, 50%);
		}

		.wc-clock__label__7 {
			transform: translate(-25%, 43%);
		}

		.wc-clock__label__8 {
			transform: translate(-43%, 25%);
		}

		.wc-clock__label__9 {
			transform: translate(-50%, 0);
		}

		.wc-clock__label__10 {
			transform: translate(-43%, -25%);
		}

		.wc-clock__label__11 {
			transform: translate(-25%, -43%);
		}

		.wc-clock__label__12 {
			transform: translate(0, -50%);
		}
	</style>
	<div class="wc-clock__border">
		<div class="wc-clock__face">
			<div class="wc-clock__label wc-clock__label__1">
				1
			</div>
			<div class="wc-clock__label wc-clock__label__2">
				2
			</div>
			<div class="wc-clock__label wc-clock__label__3">
				3
			</div>
			<div class="wc-clock__label wc-clock__label__4">
				4
			</div>
			<div class="wc-clock__label wc-clock__label__5">
				5
			</div>
			<div class="wc-clock__label wc-clock__label__6">
				6
			</div>
			<div class="wc-clock__label wc-clock__label__7">
				7
			</div>
			<div class="wc-clock__label wc-clock__label__8">
				8
			</div>
			<div class="wc-clock__label wc-clock__label__9">
				9
			</div>
			<div class="wc-clock__label wc-clock__label__10">
				10
			</div>
			<div class="wc-clock__label wc-clock__label__11">
				11
			</div>
			<div class="wc-clock__label wc-clock__label__12">
				12
			</div>
		</div>
	</div>
`;

class WCClockElement extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({mode: "open"});
		shadow.append(wcClockTemplate.content);
	}
}

customElements.define("wc-clock", WCClockElement);

function toDegrees(radians) {
	return radians / (Math.PI / 180);
}

function toRadians(degrees) {
	return degrees * (Math.PI / 180);
}

class Vec2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	angle() {
		return Math.atan2(-this.x, this.y) + Math.PI;
	}

	angleDegrees() {
		return (toDegrees(this.angle()) + 450) % 360;
	}

	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	toFixed(fractionDigits) {
		return new Vec2D(
			this.x.toFixed(fractionDigits),
			this.y.toFixed(fractionDigits),
		);
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}
}

Vec2D.fromAngleMagnitude = (angleInRadians, magnitude) => {
	return new Vec2D(
		Math.sin(angleInRadians) * magnitude,
		Math.cos(angleInRadians) * magnitude,
	);
};

const debugText = document.getElementById("debug");

for (let i = 0; i < 12; ++i) {
	const v = Vec2D.fromAngleMagnitude(toRadians((i + 1) * 30), 50);
	debugText.innerHTML += `<br/>${String(i + 1).padStart(2, "0")} ${v.toFixed()}`;
}


// addEventListener("mousemove", e => {
// 	const viewportWidth = document.documentElement.clientWidth;
// 	const viewportHeight = document.documentElement.clientHeight;
// 	const mouseX = e.clientX - viewportWidth / 2;
// 	const mouseY = e.clientY - viewportHeight / 2;
// 	//const angle = (toDegrees(Math.atan2(mouseY, mouseX)) + 450) % 360;
// 	const angle = toDegrees(Math.atan2(-mouseX, mouseY) + Math.PI);
// 	debugText.innerHTML = `${mouseX} ${mouseY}<br/>${angle.toFixed(0)}°`;
// });
