import { motion, useInView, useScroll } from "motion/react";
import { useRef } from "react";
import "./FramerWrap.css";

const ITEMS = Array.from({ length: 16 }, (_, i) => ({ id: `item-${i}` }));

export function FramerWrap() {
	const { scrollYProgress } = useScroll();
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: false,
		margin: "-25% 0px -10% 0px",
		amount: 0.3,
	});

	// Calculate diagonal wave order for 4x4 grid
	const getDiagonalOrder = (index: number, cols: number) => {
		const row = Math.floor(index / cols);
		const col = index % cols;
		// Diagonal index: items on the same diagonal have the same sum of row + col
		return row + col;
	};

	const getAnimationProps = (index: number) => {
		const diagonalIndex = getDiagonalOrder(index, 4);
		return {
			initial: { opacity: 0, skewY: 0.8, y: 10, x: 10, duration: 0.3 },
			animate: {
				opacity: isInView ? 1 : 0,
				skewY: isInView ? 0 : 0.8,
				y: isInView ? 0 : 10,
				x: isInView ? 0 : 10,
			},
			transition: {
				duration: 0.3,
				delay: 0.1 * diagonalIndex,
				type: "spring" as const,
				stiffness: 80,
			},
		};
	};

	return (
		<div
			style={{
				position: "relative",
				maxWidth: "640px",
				margin: "0 auto",
			}}
		>
			<motion.div
				className="framer-stiky-bar"
				style={{
					scaleX: scrollYProgress,
					originX: 0,
				}}
			></motion.div>
			<motion.div className="framer-wrap" ref={ref}>
				{ITEMS.map((item, index) => {
					const animProps = getAnimationProps(index);
					return (
						<motion.div
							key={item.id}
							className="framer-content"
							{...animProps}
							viewport={{ once: false }}
						></motion.div>
					);
				})}
			</motion.div>
		</div>
	);
}
