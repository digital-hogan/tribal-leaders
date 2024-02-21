import { GithubLogo, Envelope, Globe, TwitterLogo } from "@phosphor-icons/react";

export default function Footer () {
	return (
		<div className="bg-gray-700 text-white">
			<div className="justify-center py-4 flex space-x-4">
				<a href="https://github.com/theronj60" target="_blank" className="">
					<div className="border border-white hover:border-sky-300 hover:text-sky-300 rounded-lg p-2">
						<GithubLogo size={32} />
					</div>
				</a>
				<a href="mailto:admin@digitalhogan.com" className="">
					<div className="border border-white hover:border-sky-300 hover:text-sky-300 rounded-lg p-2">
						<Envelope size={32} />
					</div>
				</a>
				<a href="https://joetwebdev.io" target="_blank" className="">
					<div className="border border-white hover:border-sky-300 hover:text-sky-300 rounded-lg p-2">
						<Globe size={32} />
					</div>
				</a>
				<a href="https://twitter.com/dk_joe60" target="_blank" className="">
					<div className="border border-white hover:border-sky-300 hover:text-sky-300 rounded-lg p-2">
						<TwitterLogo size={32} />
					</div>
				</a>
			</div>
			<div className="text-center mx-4 pb-4">
				© 2024 Theron Joe <a href="https://github.com/digital-hogan/tribal-leaders" target="_blank" className="hover:text-blue-400 hover:underline">This website is open source.</a>
			</div>
		</div>
	);
}
