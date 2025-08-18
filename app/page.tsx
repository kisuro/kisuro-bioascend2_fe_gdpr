"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Activity, Brain, BookOpen, Zap, Sparkles, Shield, ArrowRight, Play } from "lucide-react"

const features = [
	{
		title: "Biorhythms",
		description:
			"Discover the ancient science of biorhythms and how they impact your daily life. Get personalized insights into your physical, emotional, and intellectual cycles.",
		href: "/biorhythms",
		icon: Activity,
		color: "text-primary",
	},
	{
		title: "Supplements",
		description:
			"Explore our range of science-backed supplements designed to enhance your health, boost performance, and support longevity.",
		href: "/supplements",
		icon: Brain,
		color: "text-accent",
	},
	{
		title: "Nutrition",
		description:
			"Unlock the power of personalized nutrition. Learn how to fuel your body for optimal performance and healthspan.",
		href: "/nutrition",
		icon: BookOpen,
		color: "text-secondary",
	},
	{
		title: "Fitness",
		description:
			"Transform your body with our expert-led fitness programs. Tailored workouts to help you achieve your health and fitness goals.",
		href: "/fitness",
		icon: Zap,
		color: "text-tertiary",
	},
	{
		title: "Sleep",
		description:
			"Master the art of restorative sleep. Understand your sleep patterns and how to improve them for better health and performance.",
		href: "/sleep",
		icon: Sparkles,
		color: "text-quaternary",
	},
	{
		title: "Mindfulness",
		description:
			"Enhance your mental well-being with our mindfulness and meditation resources. Cultivate a balanced and focused mind.",
		href: "/mindfulness",
		icon: Shield,
		color: "text-quinary",
	},
]

const BiorhythmBackground = () => {
	return (
		<motion.div
			className="absolute inset-0 pointer-events-none"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 2 }}
		>
			{/* Bio-inspired hexagonal cell pattern */}
			<motion.svg
				className="absolute top-10 right-20 w-40 h-40 text-[#E57373]/4"
				viewBox="0 0 100 100"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 4, delay: 2 }}
			>
				<motion.polygon
					points="50,15 65,25 65,45 50,55 35,45 35,25"
					stroke="currentColor"
					strokeWidth="1"
					fill="none"
					animate={{ rotate: [0, 360] }}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
				/>
				<motion.polygon
					points="50,25 60,32 60,42 50,48 40,42 40,32"
					stroke="currentColor"
					strokeWidth="0.5"
					fill="none"
					animate={{ rotate: [360, 0] }}
					transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
				/>
			</motion.svg>

			{/* Neuron-like branching lines */}
			<motion.svg
				className="absolute bottom-20 left-10 w-32 h-32 text-[#64B5F6]/5"
				viewBox="0 0 100 100"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 3, delay: 2.5 }}
			>
				<motion.path
					d="M50,50 L30,30 M50,50 L70,30 M50,50 L30,70 M50,50 L70,70 M50,50 L50,20 M50,50 L50,80"
					stroke="currentColor"
					strokeWidth="1"
					fill="none"
					animate={{
						pathLength: [0, 1, 0],
						opacity: [0.3, 0.8, 0.3],
					}}
					transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
				/>
				<motion.circle
					cx="50"
					cy="50"
					r="3"
					fill="currentColor"
					animate={{
						r: [3, 5, 3],
						opacity: [0.5, 1, 0.5],
					}}
					transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
				/>
			</motion.svg>
		</motion.div>
	)
}

export default function HomePage() {
	const [isClient, setIsClient] = React.useState(false)

	React.useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return null // Return null on server-side to prevent hydration issues
	}

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative overflow-hidden py-24 pb-32 px-4">
				<div className="absolute inset-0">
					<motion.div
						className="absolute inset-0 bg-gradient-to-br from-[#E57373]/12 via-[#64B5F6]/10 to-[#81C784]/15"
						animate={{
							background: [
								"linear-gradient(45deg, rgba(229,115,115,0.12), rgba(100,181,246,0.10), rgba(129,199,132,0.15))",
								"linear-gradient(90deg, rgba(100,181,246,0.15), rgba(129,199,132,0.12), rgba(229,115,115,0.10))",
								"linear-gradient(135deg, rgba(129,199,132,0.12), rgba(229,115,115,0.15), rgba(100,181,246,0.10))",
								"linear-gradient(180deg, rgba(229,115,115,0.10), rgba(100,181,246,0.15), rgba(129,199,132,0.12))",
								"linear-gradient(45deg, rgba(229,115,115,0.12), rgba(100,181,246,0.10), rgba(129,199,132,0.15))",
							],
						}}
						transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#64B5F6]/8 to-[#E57373]/10"
						animate={{
							background: [
								"linear-gradient(225deg, transparent, #64B5F6/8, #E57373/10)",
								"linear-gradient(270deg, transparent, #81C784/8, #64B5F6/10)",
								"linear-gradient(315deg, transparent, #E57373/8, #81C784/10)",
								"linear-gradient(0deg, transparent, #64B5F6/10, #E57373/8)",
								"linear-gradient(225deg, transparent, #64B5F6/8, #E57373/10)",
							],
						}}
						transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
					/>
					{/* Additional depth layer */}
					<motion.div
						className="absolute inset-0 bg-gradient-radial from-transparent via-primary/3 to-transparent"
						animate={{
							scale: [1, 1.1, 1],
							opacity: [0.3, 0.6, 0.3],
						}}
						transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
					/>
				</div>

				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />

				<BiorhythmBackground />

				<div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background/90 pointer-events-none">
					{/* Fading biorhythm waves at bottom */}
					<motion.svg
						className="absolute bottom-0 left-0 w-full h-20 text-[#64B5F6]/3"
						viewBox="0 0 800 50"
						preserveAspectRatio="none"
						style={{ opacity: 0.3 }}
					>
						<motion.path
							d="M0,25 Q200,10 400,25 Q600,40 800,25"
							stroke="currentColor"
							strokeWidth="1"
							fill="none"
							animate={{
								d: [
									"M0,25 Q200,10 400,25 Q600,40 800,25",
									"M0,25 Q200,15 400,25 Q600,35 800,25",
									"M0,25 Q200,10 400,25 Q600,40 800,25",
								],
							}}
							transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
						/>
					</motion.svg>
				</div>

				<div className="relative max-w-7xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: "easeOut" }}
						className="text-center mb-20"
					>
						<motion.h1
							className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-heading"
							initial={{ opacity: 0, y: 60, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{
								duration: 1.4,
								delay: 0.2,
								type: "spring",
								stiffness: 100,
								damping: 15,
							}}
						>
							Optimize Your
							<br />
							<motion.span
								className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 1.2, delay: 0.6 }}
							>
								Human Potential
							</motion.span>
						</motion.h1>

						<motion.p
							className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 1,
								delay: 0.8,
								type: "spring",
								stiffness: 80,
								damping: 12,
							}}
						>
							Unlock the science of biohacking with personalized insights, evidence-based supplements, and AI-powered
							recommendations for mental health and longevity.
						</motion.p>

						<motion.div
							className="flex flex-col sm:flex-row gap-6 justify-center items-center"
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 1 }}
						>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
								transition={{ duration: 0.2 }}
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{
									duration: 0.6,
									delay: 1.2,
									type: "spring",
									stiffness: 200,
									damping: 15,
								}}
							>
								<LiquidButton
									size="lg"
									className="bg-gradient-to-br from-primary/90 via-accent/70 to-primary/95 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
									asChild
								>
									<Link href="/biorhythms">
										Start Your Journey
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</LiquidButton>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
								transition={{ duration: 0.2 }}
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{
									duration: 0.6,
									delay: 1.4,
									type: "spring",
									stiffness: 200,
									damping: 15,
								}}
							>
								<LiquidButton variant="outline" size="lg" asChild>
									<Link href="#features">
										<Play className="mr-2 h-5 w-5" />
										Explore Features
									</Link>
								</LiquidButton>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 1.6 }}
				>
					{[0, 1, 2].map((index) => (
						<motion.div
							key={index}
							className="text-center"
							whileHover={{ scale: 1.05, y: -5 }}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 1.8 + index * 0.2,
								type: "spring",
								stiffness: 100,
							}}
						>
							{index === 0 && (
								<>
									<div className="text-4xl font-bold text-primary mb-2">67%</div>
									<div className="text-sm text-muted-foreground">of Americans identify as biohackers</div>
									<div className="text-xs text-muted-foreground/70 mt-1">
										Majority see optimizing body & mind as healthy lifestyle
									</div>
									<div className="text-xs text-muted-foreground/50 mt-2 italic">
										<a
											href="https://sanctuarywellnessinstitute.com/blog/biohacking-statistics-trends/?utm_source=chatgpt.com"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary transition-colors"
										>
											Source: Sanctuary Wellness Institute (2025)
										</a>
									</div>
								</>
							)}
							{index === 1 && (
								<>
									<div className="text-4xl font-bold text-accent mb-2">Creatine</div>
									<div className="text-sm text-muted-foreground">improves short-term memory & thinking</div>
									<div className="text-xs text-muted-foreground/70 mt-1">
										Validated in Nutrition Reviews meta-analysis (2023)
									</div>
									<div className="text-xs text-muted-foreground/50 mt-2 italic">
										<a
											href="https://en.wikipedia.org/wiki/Creatine?utm_source=chatgpt.com"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary transition-colors"
										>
											Source: Nutrition Reviews (2023)
										</a>
									</div>
								</>
							)}
							{index === 2 && (
								<>
									<div className="text-4xl font-bold text-primary mb-2">30-40%</div>
									<div className="text-sm text-muted-foreground">Fasting extends lifespan in animal studies</div>
									<div className="text-xs text-muted-foreground/70 mt-1">
										Time-restricted feeding improved metabolism and longevity
									</div>
									<div className="text-xs text-muted-foreground/50 mt-2 italic">
										<a
											href="https://www.nejm.org/doi/full/10.1056/NEJMra1905136?utm_source=chatgpt.com"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary transition-colors"
										>
											Source: NEJM (2019)
										</a>
									</div>
								</>
							)}
						</motion.div>
					))}
				</motion.div>
			</section>

			{/* Features Section */}
			<section id="features" className="relative py-18 px-4 bg-background">
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<motion.svg
						className="absolute top-10 right-10 w-40 h-40 text-[#81C784]/8"
						viewBox="0 0 100 100"
						initial={{ opacity: 0, rotate: -45 }}
						whileInView={{ opacity: 1, rotate: 0 }}
						transition={{ duration: 3 }}
						viewport={{ once: true }}
					>
						<motion.path
							d="M10,50 Q30,10 50,50 Q70,90 90,50"
							stroke="currentColor"
							strokeWidth="3"
							fill="none"
							animate={{
								d: [
									"M10,50 Q30,10 50,50 Q70,90 90,50",
									"M10,50 Q30,20 50,50 Q70,80 90,50",
									"M10,50 Q30,10 50,50 Q70,90 90,50",
								],
							}}
							transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
						/>
					</motion.svg>
				</div>

				<div className="max-w-7xl mx-auto">
					<motion.div
						className="text-center mb-20"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl md:text-6xl font-bold mb-8 font-heading">
							Everything You Need to
							<span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
								{" "}
								Biohack
							</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Comprehensive tools and insights to optimize your health, performance, and longevity
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => {
							const Icon = feature.icon
							return (
								<motion.div
									key={feature.title}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.15 }}
									viewport={{ once: true }}
									whileHover={{ y: -8, transition: { duration: 0.2 } }}
								>
									<GlassCard
										variant="strong"
										className="p-8 h-full group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer rounded-3xl"
										hover
									>
										<Link href={feature.href} className="block">
											<div className="flex items-center mb-6">
												<motion.div
													className="p-4 rounded-2xl bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl border border-white/30 shadow-xl dark:from-white/15 dark:to-white/5 dark:border-white/20 mr-4"
													whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
												>
													<Icon className={`h-7 w-7 ${feature.color}`} />
												</motion.div>
												<h3 className="text-2xl font-semibold font-heading">{feature.title}</h3>
											</div>
											<p className="text-muted-foreground leading-relaxed mb-6 text-lg">{feature.description}</p>
											<motion.div className="flex items-center text-primary group-hover:translate-x-3 transition-transform duration-300">
												<span className="text-sm font-medium">Learn more</span>
												<ArrowRight className="ml-2 h-4 w-4" />
											</motion.div>
										</Link>
									</GlassCard>
								</motion.div>
							)
						})}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 px-4 bg-background">
				<div className="max-w-5xl mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<GlassCard
							variant="strong"
							className="p-16 rounded-3xl bg-gradient-to-br from-primary/5 via-accent/3 to-primary/8 shadow-2xl"
							animate
						>
							<h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading">Ready to Transform Your Health?</h2>
							<p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
								Join thousands of biohackers who are already optimizing their performance with science-backed insights
								and personalized recommendations.
							</p>

							<div className="flex flex-col sm:flex-row gap-6 justify-center">
								<LiquidButton
									size="lg"
									className="bg-gradient-to-br from-primary/90 via-accent/70 to-primary/95 hover:shadow-2xl hover:shadow-primary/30"
									asChild
								>
									<Link href="/biorhythms">
										Start Free Today
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</LiquidButton>

								<LiquidButton variant="outline" size="lg" asChild>
									<Link href="/supplements">Browse Supplements</Link>
								</LiquidButton>
							</div>

							<div className="mt-10 text-sm text-muted-foreground">
								<p>No credit card required • Free biorhythms calculator • Premium features available</p>
							</div>
						</GlassCard>
					</motion.div>
				</div>
			</section>

			{/* Medical Disclaimer */}
			<section className="py-12 px-4 border-t border-border/30 bg-background">
				<div className="max-w-5xl mx-auto">
					<GlassCard variant="subtle" className="p-8 rounded-2xl">
						<div className="flex items-start gap-4">
							<Shield className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
							<div className="text-sm text-muted-foreground leading-relaxed">
								<strong className="text-foreground">Medical Disclaimer:</strong> This application is for educational and
								informational purposes only. It is not intended to diagnose, treat, cure, or prevent any disease. Always
								consult with a qualified healthcare professional before making any changes to your health regimen or
								supplement routine.
							</div>
						</div>
					</GlassCard>
				</div>
			</section>
		</div>
	)
}
