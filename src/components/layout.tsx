import Footer from './footer';
import Header from './header';

type LayoutProps = {
	children: React.ReactNode,
};

export default function Layout ({ children }: LayoutProps) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-grow w-full flex flex-col justify-center items-center bg-gray-200">
				<main className="flex flex-col items-center justify-center">
					{ children }
				</main>
			</div>
			<Footer />
		</div>
	)
}
