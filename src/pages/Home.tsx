import React, { useState, useEffect, useRef } from 'react';
import {
	Play,
	CheckCircle,
	Star,
	Users,
	X,
	AlertTriangle,
	TrendingUp,
	Shield,
	Clock,
} from 'lucide-react';

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

const Home: React.FC = () => {
	const [showVideo, setShowVideo] = useState<boolean>(false);
	const [watchingCount, setWatchingCount] = useState<number>(700);
	const [spotsLeft, setSpotsLeft] = useState<number>(100);
	const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
	const [notification, setNotification] = useState<{
		name: string;
		amount: number;
	} | null>(null);
	const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null
	);

	const nigerianNames = [
		'Akinlabi Akintola',
		'Chikaodinaka Nwokorie',
		'Hassan Maikudi',
		'Ebahi Oaikhena',
		'Idoreyin Ekpe',
		'Ngutor Akume',
		'Oluwadamilola Adebisi',
		'Kelechi Iheanacho',
		'Auta Adamu',
		'Ikhioya Osazuwa',
		'Ayanime Effiong',
		'Cieryol Tarka',
		'Ayodeji Olajumoke',
		'Chinyere Nwachukwu',
		'Danladi Bako',
		'Odemwingie Obasuyi',
		'Utomobong Akpabio',
		'Ahemen Ayatse',
		'Adekunle Agboola',
		'Chiamaka Madueke',
		'Aminu Maigari',
		'Ehimika Osagie',
		'Idoreyin Akpabio',
		'Terdoo Aku',
		'Ayodeji Adediran',
		'Chibuzo Nwodo',
		'Hafsah Harouna',
		'Oghogho Omorodion',
		'Ukeme Ekpe',
		'Dooshima Tarka',
		'Omolayo Oladele',
		'Bashir Maikudi',
		'Adesuwa Osazuwa',
		'Ayanime Mensah',
		'Aondoaseer Ayatse',
		'Oluwaseun Fashola',
		'Chinedu Nwakaeme',
		'Zarah Gwarzo',
		'Obaseki Omoruyi',
		'Utomobong Ekong',
		'Bemgba Unongo',
		'Abimbola Akintunde',
		'Chinyere Ikechukwu',
		'Gambo Dantata',
		'Eghosa Osawe',
		'Mmedăra Bassey',
		'Aondoakura Akume',
		'Oyindamola Ogunleye',
		'Chinonso Monye',
		'Ngozi Okoronkwo',
		'Ifueko Okojie',
		'Imoh Effiong',
		'Terfa Sai',
		'Temilade Oladimeji',
		'Chibuike Anyadike',
		'Fatima Rabiu',
		'Igbinedion Obasogie',
		'Ekom Uduak',
		'Cieryol Torkula',
		'Bolaji Adelola',
		'Chigozie Nwachukwu',
		'Osemen Odaro',
		'Abasi-akara Ekemini',
		'Iyua Sen',
		'Olamide Olanipekun',
		'Adedoyin Ayoyinka',
		'Chukwuma Chukwu',
		'Aisha Maigari',
		'Ododoh Osagie',
		'Itohowo Akpabio',
		'Ngutor Tarka',
		'Oluwatobi Oyedepo',
		'Chiemeka Nnamani',
		'Ibrahim Dantata',
		'Oweleke Omorodion',
		'Idongesit Mensah',
		'Aondoana Aku',
		'Ifeoluwa Adeyemi',
		'Chidalu Anozie',
		'Aliyu Balarabe',
		'Oyakhire Osazuwa',
		'Doofan Ayatse',
		'Adetunji Bamigboye',
		'Chibueze Obiora',
		'Zainab Halima',
		'Ohiomoba Obasuyi',
		'Abasiakan Effiong',
		'Mbatsagher Unongo',
		'Ayomide Adebayo',
		'Ifeoma Igwe',
		'Umar Babangida',
		'Erumuste Okojie',
		'Aondoaver Tarka',
		'Olumide Ojo',
		'Nkiruka Nwosu',
		'Yusuf Rabiu',
		'Ikhuemen Osagie',
		'Ayanime Akpabio',
		'Terungwa Aku',
		'Adebola Omolade',
		'Chinweike Maduka',
		'Fatima Abubakar',
		'Obokhai Omorodion',
		'Bem Tarka',
		'Oluwatosin Balogun',
		'Chidimma Aneke',
		'Amina Aliyu',
		'Ileogben Osazuwa',
		'Ekom Effiong',
		'Ciater Ayatse',
		'Adewale Adewusi',
		'Chizoba Nwachukwu',
		'Folasade Soyinka',
		'Chibundu Duru',
		'Musa Haruna',
		'Adoga Oaikhena',
		'Itoro Ekpe',
		'Doosuur Aku',
		'Abiodun Falola',
		'Chukwudi Obuh',
		'Abdulrahman Bako',
		'Ikhide Obasuyi',
		'Uduakobong Akpabio',
		'Adekunbi Oladapo',
		'Chijioke Okeke',
		'Danjuma Dantata',
		'Ehinoma Osagie',
		'Mfon Ekpe',
		'Mimidoo Ayatse',
		'Opeyemi Jimoh',
		'Chimaobi Ibekwe',
		'Igbahioa Omorodion',
		'Aondohemba Unongo',
		'Taiwo Balogun',
		'Amaka Okorie',
		'Edeki Okojie',
		'Oluwole Olaniyan',
		'Chinyelu Nwosu',
		'Alegbe Osazuwa',
		'Adetokunbo Adesina',
		'Chiedozie Nwachukwu',
		'Safiya Rabiu',
		'Ikhilosen Obasuyi',
		'Ekom Akpabio',
		'Ayodele Oyeyemi',
		'Chinwendu Madueke',
		'Umar Dantata',
		'Osuare Omorodion',
		'Abiola Adebayo',
	];

	// --- useEffect Hooks for dynamic UI elements ---
	useEffect(() => {
		const interval = setInterval(() => {
			setWatchingCount(
				(prevCount) => prevCount + Math.floor(Math.random() * 5) + 1
			);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const showRandomNotification = () => {
			const randomName =
				nigerianNames[Math.floor(Math.random() * nigerianNames.length)];
			setNotification({ name: randomName, amount: 2000 });
			setSpotsLeft((prev) => {
				if (prev > 3) {
					return prev - 1;
				}
				return 3;
			});
			notificationTimeoutRef.current = setTimeout(() => {
				setNotification(null);
			}, 5000);
		};

		const notificationInterval = setInterval(showRandomNotification, 10000);

		return () => {
			clearInterval(notificationInterval);
			if (notificationTimeoutRef.current) {
				clearTimeout(notificationTimeoutRef.current);
			}
		};
	}, []);

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth',
		});
	};

	const benefits: Benefit[] = [
		{
			text: 'Traditional farming is expensive (feeds, maintenance, space)',
			isPositive: false,
		},
		{ text: 'Takes too long to see profits', isPositive: false },
		{ text: 'Fish farming seems too complicated', isPositive: false },
	];

	const courseFeatures: CourseFeature[] = [
		{
			title: 'Less space required',
			description: 'Start in your backyard or even with Buckets!',
		},
		{
			title: 'Very low feeding costs',
			description: 'Save 80% Compared to Farming Table-Size',
		},
		{
			title: 'High Demand from Local Fish Farmers',
			description: 'Customers are already waiting & ready to Buy!',
		},
		{
			title: 'Faster Profit Turnover',
			description: 'Hatch, Raise & Sell in 4-8 weeks',
		},
	];

	// Corrected bonuses array with unique descriptions
	const bonuses: Bonus[] = [
		{
			title: 'Parent fish selection',
			description: 'Choose broodstock that multiply your profits',
		},
		{
			title: 'Fingerlings care system',
			description: 'Raise strong, healthy, high-demand fingerlings in 8 weeks',
		},
		{
			title: 'Selling guides',
			description: 'How to get buyers even before you hatch your first batch',
		},
		{
			title: 'Fish food formulation secrets',
			description:
				'Discover cheap and effective feed formulations to grow fish bigger, faster',
		},
		{
			title: 'Access to supplies & buyers',
			description:
				'Get trusted contacts for supplies and eager buyers instantly',
		},
		{
			title: 'Support group access',
			description:
				'Join a vibrant WhatsApp community of successful Catfish hatchers for ongoing support',
		},
	];

	const handleVideoClick = (): void => {
		setShowVideo(true);
	};

	const handleCloseVideo = (): void => {
		setShowVideo(false);
	};

	const handleInitiatePayment = (): void => {
		setShowPaymentModal(true); // Open payment method modal
	};

	const handleTransferPayment = (): void => {
		const whatsappLink = `https://wa.link/l24ezs`; // Replace with your actual WhatsApp number
		window.open(whatsappLink, '_blank');
		setShowPaymentModal(false); // Close modal
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-900'>
			{/* Video Modal */}
			{showVideo && (
				<div className='fixed inset-0 bg-black bg-opacity-90 z-[90] flex items-center justify-center p-0'>
					{' '}
					{/* Changed p-4 to p-0 */}
					<div className='relative w-full h-full bg-black overflow-hidden'>
						{' '}
						{/* Changed max-w-4xl aspect-video rounded-xl shadow-2xl to w-full h-full */}
						<button
							onClick={handleCloseVideo}
							className='absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors'
							aria-label='Close video'>
							<X size={20} className='text-white' />
						</button>
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

			{/* Payment Method Modal */}
			{showPaymentModal && (
				<div className='fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4'>
					<div className='bg-white rounded-xl p-8 shadow-2xl max-w-md w-full relative'>
						<button
							onClick={() => setShowPaymentModal(false)}
							className='absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-colors'>
							<X size={20} className='text-gray-600' />
						</button>
						<h2 className='text-2xl font-bold mb-6 text-center text-green-600'>
							Choose Payment Method
						</h2>
						<div className='space-y-4'>
							<div className='bg-blue-50 border border-blue-200 8060483871rounded-lg p-4'>
								<h3 className='font-semibold text-lg text-green-500 mb-2'>
									Direct Transfer
								</h3>
								<p className='text-gray-700 mb-3'>
									Bank Name: MONIEPOINT MFB
									<br />
									Account Number: <span className=' font-bold'>8060483871</span>
									<br />
									Account Name: Nutri Hub
								</p>
								<button
									onClick={handleTransferPayment}
									className='w-full bg-green-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors'>
									Send Receipt to WhatsApp
								</button>
								<p className='text-sm text-gray-600 mt-2'>
									(After transfer, click to send receipt button for confirmation
									on Whatsapp to get access)
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Dynamic Notification (e.g., recent purchase) */}
			{notification && (
				<div className='fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fadeInOut'>
					<p className='font-bold'>
						{notification.name} just paid ₦
						{notification.amount.toLocaleString()} now!
					</p>
				</div>
			)}

			{/* Header */}
			<div className='container mx-auto px-4 py-12 max-w-4xl'>
				{/* Urgency Badge */}
				<div className='text-center mb-8'>
					<div className='inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg'>
						<AlertTriangle className='w-4 h-4 mr-2' />
						LIMITED TIME: Only {spotsLeft} Spots Remaining
					</div>
				</div>

				{/* Main Headline */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
						How I Made <span className='text-green-600'>₦1.2 Million</span>
						<br />
						From Just <span className='text-blue-600'>2 Catfish</span>
					</h1>

					<div className='bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg mb-8 shadow-sm'>
						<p className='text-xl md:text-2xl font-semibold text-gray-800'>
							Learn the simple catfish hatching system that generates ₦380,000
							every 2 months
						</p>
					</div>
				</div>

				{/* Video Section */}
				<div className='mb-12'>
					<div
						className='relative aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-pointer group shadow-xl border-2 border-red-500 hover:border-green-500 transition-colors'
						onClick={handleVideoClick}>
						<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 flex flex-col items-center justify-center p-4 text-center'>
							<div className='bg-red-600 rounded-full p-4 md:p-6 mb-2 md:mb-4 mx-auto w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl animate-pulse'>
								<Play size={24} className='ml-1 text-white md:size-32' />
							</div>
							<h3 className='text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white'>
								Watch: Retire Early With Catfish Farming
							</h3>
							<p className='text-sm md:text-lg text-gray-200'>
								See exactly how this system works
							</p>
						</div>
						<div className='absolute bottom-4 left-4 bg-red-500 bg-opacity-75 px-3 py-1 rounded-full text-white text-sm'>
							<Users className='inline w-4 h-4 mr-1' />
							{watchingCount.toLocaleString()} watching
						</div>
					</div>
				</div>

				{/* CTA Button */}
				<div className='text-center mb-16'>
					<button
						onClick={scrollToBottom}
						className='bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-4 px-8 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300'>
						Get Instant Access - ₦2,000
					</button>
					<p className='text-gray-600 mt-3'>👆 Secure your spot now</p>
				</div>

				{/* Profit Breakdown */}
				<div className='mb-16'>
					<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-200'>
						<h2 className='text-3xl font-bold text-green-500 text-center mb-2'>
							Let me tell you a story...
						</h2>
						<div className='bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6'>
							<p className='text-lg mb-4 text-gray-700'>
								I'm not a big farmer. I don't own a large fish pond or any fancy
								equipment.
							</p>
							<p className='text-lg mb-4 text-blue-600 font-bold'>
								However, in 2023
							</p>
							<p className='text-lg mb-4 text-gray-700'>
								I discovered a{' '}
								<span className='text-green-600 font-bold'>SIMPLE PROCESS</span>{' '}
								that puts an extra ₦380,000 in my wallet every two months.
							</p>
							<p className='text-xl font-bold text-green-600'>
								Total: ₦1.52 million every year! 💰
							</p>
							<p className='text-lg mt-2 mb-4 text-gray-700'>
								In the past two years, I have made over
								<span className='text-xl ml-1 font-bold text-green-600'>
									₦3.04 million
								</span>{' '}
								by repeating this simple process.
							</p>
						</div>

						<div className='text-center mb-8'>
							<TrendingUp className='w-12 h-12 text-green-600 mx-auto mb-4' />
							<h2 className='text-3xl font-bold text-green-500 mb-2'>
								Here's exactly how the numbers work
							</h2>
						</div>

						<div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
							<h3 className='text-xl font-bold mb-4 text-gray-800'>
								The Simple Process:
							</h3>
							<div className='space-y-4'>
								<div className='flex items-center space-x-3'>
									<div className='bg-green-600 rounded-full w-8 h-8 flex items-center justify-center'>
										<span className='text-white font-bold'>1</span>
									</div>
									<p>
										<strong>Investment:</strong> ₦70,000 for 2 mature catfish +
										basic setup
									</p>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='bg-green-600 rounded-full w-8 h-8 flex items-center justify-center'>
										<span className='text-white font-bold'>2</span>
									</div>
									<p>
										<strong>Result:</strong> 20,000 baby catfish after breeding
										cycle
									</p>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='bg-green-600 rounded-full w-8 h-8 flex items-center justify-center'>
										<span className='text-white font-bold'>3</span>
									</div>
									<p>
										<strong>Sales:</strong> ₦30 per catfish after 4 months
										growth
									</p>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='bg-yellow-600 emoji rounded-full w-8 h-8 flex items-center justify-center'>
										<span className='text-white  font-bold flex'>💰</span>
									</div>
									<p className='text-xl font-bold text-green-600'>
										PROFIT: ₦530,000 per cycle!
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Problem/Solution */}
				<div className='mb-16'>
					<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-200'>
						<h2 className='text-3xl font-bold text-center mb-8 text-gray-800'>
							Why Traditional Fish Farming Fails
						</h2>

						<div className='grid md:grid-cols-2 gap-8 mb-8'>
							<div>
								<h3 className='text-xl font-bold mb-4 text-red-600'>
									❌ Old Way Problems:
								</h3>
								<div className='space-y-3'>
									{benefits.map((benefit: Benefit, index: number) => (
										<div
											key={index}
											className='flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200'>
											<X className='w-5 h-5 text-red-500 mt-0.5' />
											<span className='text-gray-700'>{benefit.text}</span>
										</div>
									))}
								</div>
							</div>

							<div>
								<h3 className='text-xl font-bold mb-4 text-green-600'>
									✅ Why Hatching is different:
								</h3>
								<div className='space-y-3'>
									{courseFeatures.map(
										(feature: CourseFeature, index: number) => (
											<div
												key={index}
												className='p-3 bg-green-50 rounded-lg border border-green-200'>
												<div className='flex items-start space-x-3'>
													<CheckCircle className='w-5 h-5 text-green-500 mt-0.5' />
													<div>
														<span className='font-semibold text-gray-800'>
															{feature.title}
														</span>
														<p className='text-sm text-gray-600'>
															{feature.description}
														</p>
													</div>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Course Content */}
				<div className='mb-16'>
					<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-200'>
						<div className='text-center mb-8'>
							<h2 className='text-3xl font-bold text-gray-800 mb-4'>
								What You Get for ₦2,000
							</h2>
							<p className='text-xl text-gray-600'>
								Complete training system + lifetime access
							</p>
						</div>

						<div className='grid md:grid-cols-2 gap-4 mb-8'>
							{bonuses.map((bonus: Bonus, index: number) => (
								<div
									key={index}
									className='flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200'>
									<Star className='w-5 h-5 text-blue-600 mt-0.5' />
									<div>
										<h4 className='font-semibold text-gray-800'>
											{bonus.title}
										</h4>
										<p className='text-sm text-gray-600'>{bonus.description}</p>
									</div>
								</div>
							))}
						</div>

						<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center'>
							<p className='text-lg font-semibold text-gray-800 mb-2'>
								📺 Complete Video Training System
							</p>
							<p className='text-gray-600'>
								Not just PDFs - watch me do it step by step
							</p>
						</div>
					</div>
				</div>

				{/* Guarantee */}
				<div className='mb-16'>
					<div className='bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center shadow-lg'>
						<Shield className='w-16 h-16 text-green-600 mx-auto mb-4' />
						<h3 className='text-2xl font-bold mb-4 text-green-800'>
							100% Money-Back Guarantee
						</h3>
						<p className='text-lg mb-4 text-gray-700'>
							If you don't make your first{' '}
							<span className=' text-3xl font-bold text-green-600'>
								{' '}
								₦200,000
							</span>{' '}
							within 6 months...
						</p>
						<p className='text-xl font-bold text-green-600'>
							I'll refund every penny!
						</p>
					</div>
				</div>

				{/* Final CTA Section */}
				<div className='bg-white rounded-xl shadow-lg p-8 border-2 border-red-200'>
					<div className='text-center mb-8'>
						<div className='flex items-center justify-center mb-4'>
							<Clock className='w-8 h-8 text-red-600 mr-2' />
							<h3 className='text-2xl font-bold text-red-600'>
								Limited Time Offer
							</h3>
						</div>
						<div className='space-y-2 mb-6'>
							<p className='text-lg text-gray-700'>
								Only {spotsLeft} spots available
							</p>
							<p className='text-lg uppercase  text-red-700 font-bold'>
								Price increases at midnight!
							</p>
							<p className='text-lg text-gray-700'>
								Then access closes forever
							</p>
						</div>
					</div>

					{/* Email Input */}

					{/* Final CTA Button */}
					<div className='text-center'>
						<button
							onClick={handleInitiatePayment}
							className='bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xl py-4 px-8 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300'>
							Click to Pay Now
						</button>

						<p className='text-gray-500 text-sm mt-4'>
							One-time payment • Lifetime access • 100% guarantee
						</p>
					</div>
				</div>
			</div>
			<style>
				{`
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }

                .animate-pulse {
                    animation: pulse 1.5s infinite;
                }

                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(20px); }
                    10% { opacity: 1; transform: translateY(0); }
                    90% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(20px); }
                }

                .animate-fadeInOut {
                    animation: fadeInOut 5s forwards;
                }
                `}
			</style>
		</div>
	);
};

export default Home;
