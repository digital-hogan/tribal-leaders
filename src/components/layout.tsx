import Footer from './footer';
import Header from './header';
import { useState, useEffect } from 'react';
import { CaretDoubleUp } from '@phosphor-icons/react';

type LayoutProps = {
	children: React.ReactNode,
};

export default function Layout ({ children }: LayoutProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Add a scroll event listener to check the scroll position
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		// Cleanup the event listener when the component unmounts
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-grow w-full flex flex-col justify-center items-center bg-gray-200">
				<main className="flex flex-col items-center justify-center">
					{ children }
				</main>
			</div>
			<button
				onClick={scrollToTop}
				className={`fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full transition-opacity ${
					isVisible ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<CaretDoubleUp size={44} />
			</button>
			<Footer />
		</div>
	)
}
