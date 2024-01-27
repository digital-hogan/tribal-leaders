import Footer from './footer';

type LayoutProps = {
	children: React.ReactNode,
};

export default function Layout ({ children }: LayoutProps) {
	return (
		<div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-200">
			<main className="flex flex-col items-center justify-center">
				{ children }
			</main>
			<Footer />
		</div>
	)
}
