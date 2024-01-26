import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from "next/head";
import { api } from "../../utils/api";

export default function Leader() {
	const router = useRouter();
	const id = Number(router.query.id);
	const { data: leaderData, isLoading } = api.leader.getLeaderById.useQuery(id);

	return (
		<>
			<Head>
				<title>{leaderData?.firstName} - {leaderData?.tribe}</title>
				<meta name="description" content="Search for your tribal leaders" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gray-200 text-black px-8">
				<div className="w-full lg:w-[1000px] border flex flex-col justify-center p-4 md:p-12 bg-white rounded-lg lg:my-16">
					<div className="flex justify-start mb-4">
						<Link href={'/'} className="border rounded-lg px-2 hover:bg-gray-200">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 text-gray-600 stroke-2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
							</svg>
						</Link>
					</div>
					{
						isLoading ? (
							<div className="flex justify-center items-center space-x-4">
								<div className="text-2xl">Loading</div>
								<svg className="animate-spin h-8" fill="#000000" viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg">
									<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
									<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
									<g id="SVGRepo_iconCarrier">
										<path d="m4.818 6.664s0 0-.001 0c-1.02 0-1.847-.827-1.847-1.847s.827-1.847 1.847-1.847 1.847.827 1.847 1.847c0 .51-.207.972-.541 1.306-.324.334-.776.541-1.277.541-.01 0-.019 0-.029 0zm-2.97 7.182s0 0-.001 0c-1.02 0-1.847-.827-1.847-1.847s.827-1.847 1.847-1.847 1.847.827 1.847 1.847c0 .51-.207.972-.541 1.306-.324.334-.776.541-1.278.541-.01 0-.021 0-.031 0h.002zm10.152-10.154s0 0-.001 0c-1.02 0-1.847-.827-1.847-1.847s.827-1.847 1.847-1.847 1.847.827 1.847 1.847c0 .51-.207.972-.541 1.306-.324.334-.776.541-1.277.541-.01 0-.019 0-.029 0zm-7.182 17.337s0 0-.001 0c-1.02 0-1.847-.827-1.847-1.847s.827-1.847 1.847-1.847 1.847.827 1.847 1.847c0 .51-.207.972-.541 1.306-.323.334-.775.541-1.276.541-.01 0-.021 0-.031 0zm14.364-13.904c-1.275 0-2.308-1.033-2.308-2.308s1.033-2.308 2.308-2.308c1.275 0 2.308 1.033 2.308 2.308s-1.033 2.308-2.308 2.308zm-7.182 16.875s0 0-.001 0c-1.02 0-1.847-.827-1.847-1.847s.827-1.847 1.847-1.847 1.847.827 1.847 1.847c0 .51-.207.972-.541 1.306-.324.334-.776.541-1.277.541-.01 0-.019 0-.029 0zm10.154-9.231c-.014 0-.031 0-.048 0-.75 0-1.428-.309-1.913-.807l-.001-.001c-.499-.503-.808-1.196-.808-1.961s.308-1.458.808-1.962c.486-.499 1.164-.808 1.914-.808h.05-.003.048c.75 0 1.427.309 1.913.807l.001.001c.499.503.808 1.196.808 1.961s-.308 1.458-.808 1.962c-.486.499-1.164.809-1.915.809-.016 0-.033 0-.049 0h.002zm-2.971 7.643c-.015 0-.032 0-.05 0-.878 0-1.671-.365-2.236-.951l-.001-.001c-.584-.584-.945-1.391-.945-2.283s.361-1.698.945-2.283c.567-.583 1.358-.945 2.234-.945h.054-.003.042c.877 0 1.67.362 2.237.944l.001.001c.588.582.952 1.39.952 2.283s-.364 1.7-.952 2.282c-.567.588-1.361.953-2.24.953-.014 0-.027 0-.04 0z"></path>
									</g>
								</svg>
							</div>
						) : (
							<>
								<h1 className="text-3xl text-center mb-6">Leader Details</h1>
								<div className="grid grid-cols-2 md:grid-cols-4">
									<div className="border p-2">
										<label className="text-lg text-gray-600 font-medium border-b-2">Job Title:</label>
										<p>{ leaderData?.jobTitle }</p>
									</div>
									<div className="border p-2">
										<label className="text-lg text-gray-600 font-medium border-b-2">Name:</label>
										<p>{`${leaderData?.firstName} ${leaderData?.lastName}`}</p>
									</div>
									<div className="border p-2">
										<label className="text-lg text-gray-600 font-medium border-b-2">Tribe:</label>
										<p>{ leaderData?.tribe }</p>
									</div>
									<div className="border p-2">
										<label className="text-lg text-gray-600 font-medium border-b-2">State:</label>
										<p>{ leaderData?.state }</p>
									</div>
								</div>
								<h2 className="text-2xl text-center my-6">Contact Info</h2>
								<div className="grid grid-cols-1 md:grid-cols-2">
									<div className="border p-2">
										<label className="text-lg text-gray-600 font-medium border-b-2">Office Phone:</label>
										<p>{leaderData?.phone}</p>
									</div>
									<div className="border p-2">
										<label className="text-lg text-gray-600 font-medium border-b-2">Email:</label>
										<p>{leaderData?.email}</p>
									</div>
									<div className="border p-2">
										<label className="text-lg text-gray-600 font-medium border-b-2">Mailing Address:</label>
										<p>{leaderData?.mailingAddress}</p>
									</div>
									<div className="border p-2">
										<label className="text-lg text-gray-600 font-medium border-b-2">Mailing City:</label>
										<p>{ leaderData?.mailingCity }</p>
									</div>
									<div className="border p-2">
										<label className="text-lg text-gray-600 font-medium border-b-2">Mailing State:</label>
										<p>{ leaderData?.mailingState }</p>
									</div>
									<div className="border p-2">
										<label className="text-lg text-gray-600 font-medium border-b-2">Mailing Zip:</label>
										<p>{leaderData?.mailingZip}</p>
									</div>
									{/* @TODO add copy email/phone, or maybe just link it to 'a' tag */}
									{/* @TODO add hover text to fields that can be copied or click */}
								</div>
								<p className="text-sm text-center mt-2">*Contact info is for the main offices of the tribe.</p>
							</>
						)
					}
				</div>
			</main>
		</>
	);
}
