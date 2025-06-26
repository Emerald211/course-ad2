import React, { useState } from 'react';
import {
	Play,
	CheckCircle,
	Star,
	Users,
	X,
	AlertTriangle,
	TrendingUp,
	DollarSign,
	Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Benefit {
	text: string;
	isPositive: boolean;
}

interface CourseFeature {
	title: string;
	description: string;
}

interface Bonus {
	title: string;
	description: string;
}

interface PaystackResponse {
	reference: string;
	status: string;
}

interface PaystackConfig {
	key: string;
	email: string;
	amount: number;
	currency: string;
	ref: string;
	metadata: {
		custom_fields: Array<{
			display_name: string;
			variable_name: string;
			value: string;
		}>;
	};
	callback: (response: PaystackResponse) => void;
	onClose: () => void;
}

interface PaystackPop {
	setup: (config: PaystackConfig) => {
		openIframe: () => void;
	};
}

declare global {
	interface Window {
		PaystackPop: PaystackPop;
	}
}

const Home: React.FC = () => {
	const [showVideo, setShowVideo] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth',
		});
	};

	const benefits: Benefit[] = [
		{ text: "It's expensive (feeds, maintenance, space)", isPositive: false },
		{ text: 'It takes too long', isPositive: false },
		{ text: 'Fish farming is difficult', isPositive: false },
	];

	const courseFeatures: CourseFeature[] = [
		{
			title: 'Learn space required',
			description: 'Optimal pond sizing and setup',
		},
		{
			title: 'Set up the feeding cycle',
			description: 'Proper feeding schedules and techniques',
		},
		{
			title: 'Fish farm business plan finance',
			description: 'Complete financial planning guide',
		},
		{
			title: 'Frame profit forecast',
			description: 'Exact profit calculations and projections',
		},
	];

	const bonuses: Bonus[] = [
		{
			title: 'Step-by-Step Video Tutorials',
			description:
				'Watch me hatch fish from scratch (not a Youtube video - this is detailed and direct)',
		},
		{
			title: 'Family-Scale Farming',
			description:
				'How to grow fish by your own family at low cost – save money on food',
		},
		{
			title: 'Parent Fish Selection',
			description: 'Choose broadstock that multiply your profits',
		},
		{
			title: 'Fingerlings Care System',
			description: 'Raise strong healthy fish in weeks',
		},
		{
			title: 'Selling Guides',
			description: 'How to get buyers even before you hatch',
		},
		{
			title: 'Feed Formulation Secrets',
			description: 'Fish food formulation secrets – grow fish fastest cheaper',
		},
		{
			title: 'Community Access',
			description:
				'Support group access – join a growing community of fish hatchers',
		},
	];

	const handleVideoClick = (): void => {
		setShowVideo(true);
	};

	const handleCloseVideo = (): void => {
		setShowVideo(false);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
	};

	const handleGetAccess = async (): Promise<void> => {
		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log('Getting access for:', email);
		setIsLoading(false);
		scrollToBottom();
	};

	const handlePaystackCheckout = (): void => {
		setIsLoading(true);

		// Initialize Paystack payment
		const handler = window.PaystackPop.setup({
			key: paystackPublicKey,
			email: email || 'customer@example.com',
			amount: 200000,
			currency: 'NGN',
			ref: 'catfish_course_' + Math.floor(Math.random() * 1000000000 + 1),
			metadata: {
				custom_fields: [
					{
						display_name: 'Course Name',
						variable_name: 'course_name',
						value: 'Catfish Breeding Masterclass',
					},
				],
			},
			callback: function (response: PaystackResponse) {
				console.log('Payment successful:', response);
				setIsLoading(false);
				navigate('/access-course');
			},
			onClose: function () {
				console.log('Payment popup closed');
				setIsLoading(false);
			},
		});

		handler.openIframe();
	};

	const handleSecureSpot = (): void => {
		// Check if email is provided
		if (!email) {
			alert('Please enter your email address first');
			return;
		}

		// Check if Paystack is loaded
		if (typeof window.PaystackPop === 'undefined') {
			alert('Payment system is loading. Please try again in a moment.');
			return;
		}

		handlePaystackCheckout();
	};

	// Load Paystack script
	React.useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://js.paystack.co/v1/inline.js';
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div className='min-h-screen bg-gradient-to-br from-white via-white to-white text-white relative overflow-hidden'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 opacity-20'>
				<div className='absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
				<div className='absolute top-40 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000'></div>
				<div className='absolute bottom-10 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000'></div>
			</div>

			{/* Video Modal */}
			{showVideo && (
				<div className='fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4'>
					<div className='relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden border-4 border-yellow-400 shadow-2xl shadow-yellow-400/30'>
						<button
							onClick={handleCloseVideo}
							className='absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/50'
							aria-label='Close video'>
							<X size={24} />
						</button>

						{/* YouTube iframe */}
						<iframe
							className='w-full h-full'
							src='https://www.youtube.com/embed/Fwqw5mST9OY?si=DbcQcsEX3RVIZg3j'
							title='Catfish Farming Video'
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen></iframe>
					</div>
				</div>
			)}

			{/* Header */}
			<div className='container mx-auto px-4 py-8 relative z-10'>
				<div className='text-center mb-12'>
					{/* Attention-Grabbing Badge */}
					<div className='inline-flex items-center bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 animate-bounce shadow-lg shadow-red-500/30'>
						<AlertTriangle className='w-4 h-4 mr-2' />
						LIMITED TIME ONLY - 25 SPOTS LEFT!
					</div>

					<h1 className='text-5xl md:text-7xl font-black mb-6 leading-tight'>
						<span className='bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl'>
							How I Quietly Made ₦1.2 Million
						</span>
						<br />
						<span className='bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl'>
							From Just
						</span>
						<span className='bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent'>
							{' '}
							2 Catfish
						</span>
					</h1>

					<div className='bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl inline-block mb-8 shadow-2xl shadow-yellow-500/30 transform hover:scale-105 transition-all duration-300'>
						<p className='text-xl md:text-2xl font-bold'>
							🚨 No expensive equipment... Just a smart, repeatable hatching
							system that works — and you can learn it all for just ₦2,000.
						</p>
					</div>

					{/* Video Section */}
					<div className='relative max-w-5xl mx-auto mb-8'>
						<div
							className='relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border-4 border-green-500 hover:border-yellow-400 transition-all duration-500'
							onClick={handleVideoClick}
							role='button'
							tabIndex={0}
							onKeyDown={(e) => e.key === 'Enter' && handleVideoClick()}>
							<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 flex items-center justify-center group-hover:from-black/60 group-hover:to-black/60 transition-all'>
								<div className='text-center'>
									<div className='bg-gradient-to-r from-green-600 to-green-700 rounded-full p-8 mb-6 mx-auto w-28 h-28 flex items-center justify-center group-hover:scale-125 transition-transform duration-500 shadow-2xl shadow-red-500/50 animate-pulse'>
										<Play size={40} className='ml-2 text-white' />
									</div>
									<h3 className='text-2xl md:text-3xl font-black mb-4 text-green-400 drop-shadow-lg'>
										🔥 EXCLUSIVE: The SECRET Catfish Method 🔥
									</h3>
									<p className='text-lg md:text-xl text-red-400 font-bold uppercase tracking-wider'>
										Without Wasting Money on Feed!
									</p>
								</div>
							</div>
							<div className='absolute bottom-4 left-4 bg-red-600 bg-opacity-90 px-4 py-2 rounded-full text-sm font-bold border-2 border-green-500'>
								<Users className='inline w-4 h-4 mr-2' />
								<span className='text-yellow-400'>2,847</span> watching now
							</div>
							<div className='absolute top-4 right-4 bg-green-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse'>
								LIVE
							</div>
						</div>
						<button
							onClick={scrollToBottom}
							className='flex mt-8 text-center w-full  items-center justify-center bg-green-600 text-white px-4 py-5 rounded-lg shadow-md  transition'>
							CLICK TO GET STARTED NOW
						</button>
					</div>
				</div>

				{/* Social Proof and Urgency */}
				<div className='max-w-4xl mx-auto mb-16'>
					<div className=' rounded-2xl p-8 '>
						<div className='flex items-center justify-center mb-6'>
							<TrendingUp className='w-8 h-8 text-green-400 mr-3' />
							<h2 className='text-3xl font-bold text-green-400'>
								Your Roadmap to Retiring Early
							</h2>
						</div>

						<div className='grid md:grid-cols-3 gap-6 mb-8'>
							<div className='text-center bg-black rounded-xl p-6 border border-yellow-400'>
								<DollarSign className='w-12 h-12 text-yellow-400 mx-auto mb-3' />
								<h3 className='text-2xl font-bold text-yellow-400'>₦1.52M</h3>
								<p className='text-green-300'>Annual Profit</p>
							</div>
							<div className='text-center bg-black rounded-xl p-6 border border-green-400'>
								<Zap className='w-12 h-12 text-green-400 mx-auto mb-3' />
								<h3 className='text-2xl font-bold text-green-400'>4 Months</h3>
								<p className='text-green-300'>To First Profit</p>
							</div>
							<div className='text-center bg-black rounded-xl p-6 border border-red-400'>
								<AlertTriangle className='w-12 h-12 text-red-400 mx-auto mb-3' />
								<h3 className='text-2xl font-bold text-red-400'>₦2000</h3>
								<p className='text-green-300'>
									Starting Investment in Knowledge
								</p>
							</div>
						</div>

						<div className='bg-black rounded-xl p-6 border border-yellow-400'>
							<p className='text-lg mb-4 text-yellow-200'>
								⚡ <strong>This isn't the usual fish farming story...</strong>
							</p>
							<p className='text-lg mb-4'>
								I'm not a big farmer. I don't own a large fish pond or any fancy
								equipment.
							</p>
							<p className='text-lg mb-4 text-green-400 font-bold'>
								However, in 2023
							</p>
							<p className='text-lg mb-4'>
								I discovered a{' '}
								<span className='text-yellow-400 font-bold'>
									SIMPLE PROCESS
								</span>{' '}
								that puts an extra ₦380,000 in my wallet every two months.
							</p>
							<p className='text-xl font-bold text-green-400'>
								Total: ₦1.52 million every year! 💰
							</p>
							<p className='text-lg mt-2 mb-4'>
								In the past two years, I have made over
								<span className='text-xl ml-1 font-bold text-green-400'>
									₦ 3.04 million
								</span>{' '}
								by repeating this simple process.
							</p>
						</div>
					</div>
				</div>

				{/* Proof Section */}
				<div className='max-w-4xl mx-auto mb-16'>
					<div className='text-center mb-12'>
						<h3 className='text-3xl font-bold mb-8 text-green-500'>
							🎯 Let Me Show You EXACTLY How This Works:
						</h3>
						<div className='bg-black rounded-2xl p-8 '>
							<div className='space-y-6 text-left max-w-3xl mx-auto'>
								<div className='flex items-start space-x-4'>
									<div className='bg-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1'>
										<span className='text-white font-bold'>1</span>
									</div>
									<p className='text-lg'>
										<strong className='text-green-400'>Investment:</strong>{' '}
										₦70,000 for 2 mature catfish + feed + basic tools
									</p>
								</div>
								<div className='flex items-start space-x-4'>
									<div className='bg-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1'>
										<span className='text-white font-bold'>2</span>
									</div>
									<p className='text-lg'>
										<strong className='text-yellow-400'>Result:</strong> 20,000
										baby catfish after breeding
									</p>
								</div>
								<div className='flex items-start space-x-4'>
									<div className='bg-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1'>
										<span className='text-white font-bold'>3</span>
									</div>
									<p className='text-lg'>
										<strong className='text-green-400'>Sales:</strong> ₦30 per
										catfish after 4 months
									</p>
								</div>
								<div className='flex items-start space-x-4'>
									<div className='bg-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1'>
										<span className='text-white font-bold'>💰</span>
									</div>
									<p className='text-xl font-bold text-yellow-400'>
										PROFIT: ₦530,000 per cycle!
									</p>
								</div>
							</div>

							<div className='mt-8 p-6 bg-red-600/20 border-2 border-red-400 rounded-xl'>
								<p className='text-xl font-bold text-center text-red-400 mb-2'>
									⚠️ EVEN IF YOU'RE A COMPLETE BEGINNER ⚠️
								</p>
								<p className='text-lg text-center'>
									With just 10,000 baby catfish, you STILL make{' '}
									<span className='text-green-400 font-bold'>
										₦230,000 profit!
									</span>
								</p>
								<p className='text-lg text-center mt-2'>
									Repeat 6 times yearly ={' '}
									<span className='text-yellow-400 font-bold text-2xl'>
										₦1.38 MILLION+
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Problem/Solution Section */}
				<div className='max-w-4xl mx-auto mb-16'>
					<div className='bg-black backdrop-blur-sm rounded-2xl p-8 border-2 border-red-400 shadow-2xl shadow-red-500/20'>
						<h2 className='text-4xl font-bold text-center mb-8 text-red-400'>
							🚨 What You Probably Don't Know 🚨
						</h2>
						<p className='text-center mb-8 text-xl text-orange-200'>
							Most people think traditional fish farming is the only way...{' '}
							<strong>WRONG!</strong>
						</p>

						<div className='space-y-6 mb-8'>
							{benefits.map((benefit: Benefit, index: number) => (
								<div
									key={index}
									className={`flex items-start space-x-4 p-4 rounded-xl ${
										benefit.isPositive
											? 'bg-green-600/20 border border-green-400'
											: 'bg-red-600/20 border border-red-400'
									}`}>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
											benefit.isPositive ? 'bg-green-500' : 'bg-red-500'
										}`}>
										{benefit.isPositive ? (
											<CheckCircle size={20} />
										) : (
											<X size={20} />
										)}
									</div>
									<span className='text-lg font-semibold'>{benefit.text}</span>
								</div>
							))}
						</div>

						<div className='bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-400 rounded-2xl p-8 shadow-2xl shadow-green-500/30'>
							<h3 className='text-2xl font-bold mb-6 text-green-400 text-center'>
								🎯 But hatching catfish eggs ? THAT'S the GOLDMINE! 🎯
							</h3>
							<div className='grid md:grid-cols-2 gap-4'>
								{courseFeatures.map((feature: CourseFeature, index: number) => (
									<div
										key={index}
										className='flex items-start space-x-3 bg-black/30 p-4 rounded-xl'>
										<CheckCircle className='w-6 h-6 text-green-400 flex-shrink-0 mt-1' />
										<div>
											<span className='font-bold text-yellow-400'>
												{feature.title}
											</span>
											<p className='text-green-200 text-sm'>
												{feature.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Pricing Section */}
				<div className='max-w-4xl mx-auto mb-16'>
					<div className='text-center mb-12'>
						<div className='bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl inline-block mb-8 shadow-2xl shadow-yellow-500/50 animate-pulse'>
							<h2 className='text-4xl font-black'>
								🔥 YOUR ₦2,000 INVESTMENT BREAKDOWN 🔥
							</h2>
						</div>
						<p className='text-2xl mb-8 text-yellow-900'>
							One payment. Lifetime access.{' '}
							<span className='text-green-400 font-bold'>REAL results.</span>
						</p>

						<div className='bg-gradient-to-br from-purple-900 to-indigo-900 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-400 shadow-2xl'>
							<p className='text-2xl mb-8 font-bold text-purple-300'>
								🎁 EXCLUSIVE BONUS PACKAGE INCLUDED:
							</p>
							<div className='grid md:grid-cols-2 gap-6 text-left'>
								{bonuses.map((bonus: Bonus, index: number) => (
									<div
										key={index}
										className='flex items-start space-x-3 bg-black/30 p-4 rounded-xl border border-yellow-400/30'>
										<Star className='w-6 h-6 text-yellow-400 flex-shrink-0 mt-1 animate-pulse' />
										<div>
											<h4 className='font-bold text-yellow-400 mb-1'>
												{bonus.title}
											</h4>
											<p className='text-gray-200 text-sm'>
												{bonus.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className='mt-8 p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-400 rounded-2xl'>
							<p className='text-2xl font-bold text-green-400 mb-2'>
								📺 NOT just PDFs or eBooks!
							</p>
							<p className='text-xl text-green-200'>
								Complete VIDEO training system + LIVE support community
							</p>
						</div>
					</div>

					{/* Money Back Guarantee */}
					<div className='bg-black border-4 border-green-400 rounded-2xl p-8 mb-12 shadow-2xl shadow-green-500/30'>
						<div className='text-center'>
							<div className='bg-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4'>
								<CheckCircle size={40} className='text-white' />
							</div>
							<h3 className='text-3xl font-bold mb-4 text-green-400'>
								🛡️ 100% MONEY-BACK GUARANTEE 🛡️
							</h3>
							<p className='text-xl mb-4 text-green-200'>
								If you don't make your first ₦50,000 within 6 months...
							</p>
							<p className='text-2xl font-bold text-yellow-400'>
								I'll refund EVERY PENNY!
							</p>
							<p className='text-lg mt-4 text-green-300'>
								That's how confident I am in this system.
							</p>
						</div>
					</div>

					{/* Main CTA */}
					<div className='text-center mb-12'>
						<div className='bg-gradient-to-r from-red-600 to-orange-600 p-1 rounded-2xl mb-6 shadow-2xl shadow-red-500/50'>
							<button
								onClick={() => {
									handleGetAccess();
								}}
								disabled={isLoading}
								className='w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-black text-3xl font-black py-8 px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300'>
								{isLoading
									? '⏳ PROCESSING...'
									: '🚀 GET INSTANT ACCESS NOW - ₦2,000 🚀'}
							</button>
						</div>
						<p className='text-lg text-red-800 animate-pulse'>
							👆 Click above to secure your spot before it's gone!
						</p>
					</div>
				</div>

				{/* Final Urgency Section */}
				<div className='max-w-4xl mx-auto'>
					<div className='bg-gradient-to-r from-red-900 to-red-800 border-4 border-red-400 rounded-2xl p-8 text-center shadow-2xl shadow-red-500/50 relative overflow-hidden'>
						<div className='absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 animate-pulse'></div>
						<div className='relative z-10'>
							<h3 className='text-4xl font-black mb-6 text-yellow-400 animate-pulse'>
								⚠️ FINAL WARNING ⚠️
							</h3>
							<div className='space-y-4 mb-8'>
								<p className='text-2xl font-bold text-red-200'>
									🔥 Only 25 spots available
								</p>
								<p className='text-2xl font-bold text-red-200'>
									⏰ Price increases at midnight
								</p>
								<p className='text-2xl font-bold text-red-200'>
									🚫 Then access closes FOREVER
								</p>
							</div>
							<p className='text-xl mb-6 text-orange-200'>
								This isn't generic information floating around online.
							</p>
							<p className='text-xl mb-8 text-orange-200'>
								This is <strong>INSIDER KNOWLEDGE</strong> that builds REAL
								wealth.
							</p>

							<div className='bg-black/50 rounded-xl p-6 mb-8 border-2 border-yellow-400'>
								<p className='text-2xl font-bold text-yellow-400 mb-2'>
									Once we hit our limit:
								</p>
								<p className='text-xl text-red-400'>
									❌ Price DOUBLES to ₦4,000
								</p>
								<p className='text-xl text-red-400'>
									❌ OR we close enrollment completely
								</p>
							</div>

							{/* Email Collection */}
							<div className='max-w-md mx-auto mb-8'>
								<div className='bg-black/30 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-400'>
									<h3 className='text-xl font-bold mb-4 text-yellow-400'>
										Enter Your Email to Continue
									</h3>
									<input
										type='email'
										value={email}
										onChange={handleEmailChange}
										placeholder='Enter your email address'
										className='w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-yellow-400 focus:outline-none mb-4'
										required
									/>
									<p className='text-sm text-gray-300'>
										Your email is secure and will only be used for course
										access.
									</p>
								</div>
							</div>

							<button
								onClick={handleSecureSpot}
								disabled={isLoading || !email}
								className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-2xl py-6 px-12 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-yellow-400 animate-bounce'>
								{isLoading
									? '⏳ PROCESSING PAYMENT...'
									: '🔒 SECURE MY SPOT NOW - ₦2,000 🔒'}
							</button>

							{!email && (
								<p className='text-yellow-400 text-lg mt-4 animate-pulse'>
									⚠️ Please enter your email address above first
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
