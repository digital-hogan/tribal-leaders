import { GithubLogo, Envelope, Globe } from "@phosphor-icons/react";

export default function Footer () {
	return (
		<>
			<div className="py-4 flex space-x-4">
				<a href="https://github.com/theronj60" target="_blank" className="hover:bg-white rounded-full">
					<div className="border border-black rounded-full p-2">
						<GithubLogo size={32} />
					</div>
				</a>
				<a href="mailto:admin@digitalhogan.com" className="hover:bg-white rounded-full">
					<div className="border border-black rounded-full p-2">
						<Envelope size={32} />
					</div>
				</a>
				<a href="https://joetwebdev.io" target="_blank" className="hover:bg-white rounded-full">
					<div className="border border-black rounded-full p-2">
						<Globe size={32} />
					</div>
				</a>
			</div>
			<div className="text-center mx-4 pb-4">
				© 2024 Theron Joe @Digital Hogan. <a href="https://github.com/digital-hogan/tribal-leaders" target="_blank" className="hover:text-blue-400 hover:underline">This website is open source.</a>
			</div>
		</>
	);
}
