"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

// Constants
const MAX_TRANSLATE_PERCENT = 100;
const TRANSLATE_MULTIPLIER = 1.2;
const LIGHTNESS_OFFSET = 25;
const RIGHT_OFFSET = "-100%";

function Item() {
	const [yProgress, setYProgress] = useState(0);
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["end end", "start start"],
	});

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setYProgress(latest);
	});

	// Calculate horizontal translation percentage
	const calculateTranslateX = (progress: number): string => {
		const calculatedPercent = progress * TRANSLATE_MULTIPLIER * 100;
		return calculatedPercent >= MAX_TRANSLATE_PERCENT
			? `-${MAX_TRANSLATE_PERCENT}%`
			: `-${calculatedPercent}%`;
	};

	return (
		<section style={itemContainer}>
			<svg
				style={progressIcon}
				width="75"
				height="75"
				viewBox="0 0 100 100"
				aria-label="Scroll progress indicator"
			>
				<circle
					style={progressIconBg}
					cx="50"
					cy="50"
					r="30"
					pathLength="1"
					className="bg"
				/>
				<motion.circle
					cx="50"
					cy="50"
					r="30"
					pathLength="1"
					style={{
						...progressIconIndicator,
						pathLength: scrollYProgress,
					}}
				/>
			</svg>
			<div ref={ref} style={item}>
				<motion.div
					animate={{
						backgroundColor: `hsl( from var(--secondary-color) h s ${100 - yProgress * LIGHTNESS_OFFSET}% )`,
					}}
					style={{
						position: "absolute",
						top: 0,
						right: RIGHT_OFFSET,
						width: "200%",
						height: "100%",
						zIndex: 10,
						translateX: calculateTranslateX(yProgress),
					}}
					aria-hidden="true"
				></motion.div>
			</div>
		</section>
	);
}

export default function TrackElementWithinViewport() {
	return (
		<>
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
		</>
	);
}

/**
 * ==============   Styles   ================
 */

const itemContainer: React.CSSProperties = {
	height: "100vh",
	maxHeight: "400px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

const processCircle: React.CSSProperties = {
	strokeDashoffset: 0,
	strokeWidth: 5,
	fill: "none",
};

const progressIcon: React.CSSProperties = {
	...processCircle,
	transform: "translateX(-100px) rotate(-90deg)",
	stroke: "var(--secondary-hover)",
};

const progressIconIndicator: React.CSSProperties = {
	...processCircle,
	strokeDashoffset: 0,
	strokeWidth: 5,
	fill: "none",
};

const progressIconBg: React.CSSProperties = {
	opacity: 0.2,
};

const item: React.CSSProperties = {
	width: 270,
	height: 370,
	overflow: "hidden",
	border: "2px dashed var(--secondary-hover)",
	position: "relative",
};
