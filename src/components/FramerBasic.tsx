import { motion } from "motion/react";
import { useState } from "react";
import "./FramerBasic.css";

export function FramerBasic() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="wrapper">
			<div className="panel">
				<div className="header">
					<div className="text">Notifications</div>
					<motion.button
						className="button"
						whileHover={{
							scale: 1.05,
						}}
						whileTap={{
							scale: 0.95,
						}}
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? "See less" : "See more"}
					</motion.button>
				</div>
				<div className="body">
					{[1, 2, 3, 4, 5].map((item, index, arr) => (
						<motion.div
							key={item}
							className="item"
							// initial={false}
							custom={index}
							onClick={() => {
								if (isOpen) {
									console.log(`Notification #${index} clicked`);
								} else {
									setIsOpen(true);
								}
							}}
							animate={{
								transform: isOpen
									? `translateY(0%) scale(1)`
									: `translateY(${-100 * index - index * 5}%) scale(${1 - index * 0.05})`,
								backgroundColor: isOpen
									? "var(--card-bg)"
									: `color-mix(in srgb, var(--card-bg), var(--bg-color ${index === 0 ? 0 : index * 15}%)`,
								color: isOpen
									? "var(--text-color)"
									: `color-mix(in srgb, var(--text-color), var(--bg-color) ${index * 15}%)`,
								zIndex: arr.length - index,
							}}
							transition={{
								duration: 0.25,
								type: "spring",
								damping: isOpen ? 50 : 60,
								stiffness: isOpen ? 500 : 400,
								mass: 3,
							}}
							whileHover={{
								borderColor: isOpen ? "var(--primary-hover)" : undefined,
							}}
						>
							Notification {item}
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
