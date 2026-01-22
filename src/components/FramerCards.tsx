import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import "./FramerCards.css";
import ImageOne from "../images/frmr1.jpg";
import ImageTwo from "../images/frmr2.jpg";
import ImageThree from "../images/frmr3.jpg";
import ImageFour from "../images/frmr4.jpg";

const cards = [
	{
		id: "card1",
		imgSrc: ImageOne,
		title: "Card Title 1",
		subtitle: "Subtitle 1",
		description:
			"This is a description for card 1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nulla corrupti nam.",
	},
	{
		id: "card2",
		imgSrc: ImageTwo,
		title: "Card Title 2",
		subtitle: "Subtitle 2",
		description:
			"This is a description for card 2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque eveniet tenetur laboriosam nulla corrupti nam.	",
	},
	{
		id: "card3",
		imgSrc: ImageThree,
		title: "Card Title 3",
		subtitle: "Subtitle 3",
		description:
			"This is a description for card 3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nulla corrupti nam.",
	},

	{
		id: "card4",
		imgSrc: ImageFour,
		title: "Card Title 4",
		subtitle: "Subtitle 4",
		description:
			"This is a description for card 4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nulla corrupti nam.",
	},
];

const CardComponent = ({
	index,
	imgSrc,
	title,
	subtitle,
	onClick,
	activeCard,
}: {
	index: number;
	imgSrc: string;
	title: string;
	subtitle: string;
	onClick: () => void;
	activeCard: number | null;
}) => {
	const isActive = activeCard === index;

	return (
		<motion.div
			layoutId={`card-container-${index}`}
			className="card"
			role="button"
			tabIndex={0}
			aria-expanded={isActive}
			onClick={onClick}
			onKeyDown={(e) => e.key === "Enter" && onClick()}
			transition={{ layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } }}
			style={{
				visibility: isActive ? "hidden" : "visible",
				pointerEvents: activeCard === null ? "auto" : "none",
			}}
		>
			<motion.div
				className="card-img-wrapper"
				layoutId={`card-img-${index}`}
				transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
			>
				<img src={imgSrc} alt={title} />
			</motion.div>
			<motion.div
				className="card-header"
				layoutId={`card-header-${index}`}
				transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
			>
				<span>{title}</span>
				<div>{subtitle}</div>
			</motion.div>
		</motion.div>
	);
};

export function FramerCards() {
	const [activeCard, setActiveCard] = useState<number | null>(null);

	// Lock body scroll when card is open
	useEffect(() => {
		if (activeCard !== null) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [activeCard]);

	const handleActiveCard = (index: number) => {
		setActiveCard(index === activeCard ? null : index);
	};

	return (
		<div className="framer-cards-container">
			<motion.div layout className="card-wrap">
				{cards.map((card, index) => (
					<CardComponent
						key={`${card.id}`}
						index={index}
						imgSrc={card.imgSrc}
						title={card.title}
						subtitle={card.subtitle}
						onClick={() => handleActiveCard(index)}
						activeCard={activeCard}
					/>
				))}
			</motion.div>

			<AnimatePresence>
				{activeCard !== null && (
					<>
						<motion.div
							className="backdrop"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							onClick={() => setActiveCard(null)}
						/>
						<motion.div
							layoutId={`card-container-${activeCard}`}
							className="card-container-opened"
							transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
						>
							<motion.div
								className="card-img-wrapper"
								layoutId={`card-img-${activeCard}`}
								transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
							>
								<img
									src={cards[activeCard].imgSrc}
									alt={cards[activeCard].title}
								/>
							</motion.div>
							<motion.div
								className="card-header"
								layoutId={`card-header-${activeCard}`}
								transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
							>
								<span
									style={{
										fontSize: "0.85rem",
									}}
								>
									{cards[activeCard].title}
								</span>
								<div>{cards[activeCard].subtitle}</div>

								<motion.div
									className="card-desc-opened"
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
								>
									{cards[activeCard].description} - Expanded View with more
									details can go here.
								</motion.div>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
