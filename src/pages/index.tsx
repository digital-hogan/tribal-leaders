import Head from "next/head";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import LeadersMobile from "../components/leadersMobile"

export interface Leader {
	id: number;
	fullTribeName: string | null;
	tribe: string | null;
	firstName: string | null;
	lastName: string | null;
	jobTitle: string | null;
	biaAgency: string | null;
	state: string | null;
	mailingState: string | null;
}

export default function Home() {
	const [query, setQuery] = useState<{query: string; limit: number; offset: number;}>({
		query: '',
		limit: 10,
		offset: 0,
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [leaders, setLeaders] = useState<Leader[]>([]);
	const [pages, setPages] = useState(1);

	const { data: leadersData, isLoading } = api.leader.getAll.useQuery(query);

	// @TODO improve queries, multiply queries to grab data and grab total leaders for pages
	const leaderTotal = api.leader.getTotal.useQuery(query.query ?? null).data?.length;
	let totalPages = 0;

	useEffect(() => {
		setLeaders(leadersData ?? []);
		if(leaderTotal) {
			totalPages = Math.ceil(leaderTotal / query.limit);
			setPages(totalPages);
		}
	}, [leadersData]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery({
			query: event.target.value,
			limit: 10,
			offset: 0
		});
		setCurrentPage(1);
	};

	const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setQuery({
			query: query.query,
			limit: +event.target.value,
			offset: 0
		});
		setCurrentPage(1);
	};

	const handlePageClick = (page: number) => {
		setCurrentPage(page);
		setQuery({
		  ...query,
		  offset: (page - 1) * query.limit
		});
	};

	const goToNextPage = () => {
		if (currentPage < pages) {
			handlePageClick(currentPage + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			handlePageClick(currentPage - 1);
		}
	};

	const goToLeader = (id: number) => {
		window.location.assign(`/leader/${id}`);
	};

	return (
		<>
			<Head>
				<title>Find your leaders</title>
				<meta name="description" content="Search for your tribal leaders" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gray-200 px-8">
				<div className="lg:min-h-[1000px] xl:min-h-[750px] border flex flex-col justify-center p-12 bg-white rounded-lg md:my-16">
					<div className="flex flex-col md:flex-row justify-between items-center mb-4">
						<div className="flex items-center mb-6 lg:mb-0 md:space-x-6">
							<h1 className="text-3xl">Tribal Leaders</h1>
						</div>
						<div className="flex items-center space-x-6">
							<select onChange={handleLimitChange} name="limit" id="limit" className="rounded-lg border h-8 py-0 px-2">
								<option value="">Select</option>
								<option value="15">15</option>
								<option value="30">30</option>
								<option value="50">50</option>
								<option value="100">100</option>
							</select>
							<input
								type="text"
								className="flex-1 px-4 border rounded-lg h-8"
								placeholder="Search..."
								onChange={handleSearchChange}
								value={query.query}
							/>
						</div>
					</div>
					{
						isLoading ? (
							<div className="h-full lg:w-[1000px] flex justify-center items-center space-x-4">
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
								<div className="lg:hidden">
									<LeadersMobile leaderList={leadersData ?? []} />
								</div>
								<table className="hidden lg:block border shadow divide-y divide-gray-200 text-gray-600">
									<thead>
										<tr>
											{/* <th className="table-th">ID</th> */}
											<th className="table-th">Tribe</th>
											<th className="table-th">Tribal Leader</th>
											<th className="table-th">Job Title</th>
											<th className="table-th">BIA Agency</th>
											<th className="table-th">State</th>
											<th className="table-th">Full Tribe Name</th>
										</tr>
									</thead>
									<tbody className="text-gray-600">
										{leaders.map((leader) => (
											<tr key={leader.id} onClick={() => { goToLeader(leader.id) }} className="even:bg-gray-50 hover:bg-gray-100 cursor-pointer relative">
												{/* <td className="table-td">{leader.id}</td> */}
												<td className="table-td">{leader.tribe}</td>
												<td className="table-td">
													{`${leader.firstName} ${leader.lastName}`}
												</td>
												<td className="table-td">
													{leader.jobTitle}
												</td>
												<td className="table-td">
													{leader.biaAgency}
												</td>
												<td className="table-td">
													{leader.state}
												</td>
												<td className="table-td">
													{leader.fullTribeName}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</>
						)
					}
					<div className="flex justify-between mt-6">
						<div></div>
						<div className="">
							<div className="text-center">Page {currentPage} of {pages}</div>
						</div>
						<div className="">
							<button type="button" onClick={goToPreviousPage} disabled={currentPage === 1} className="border px-2 rounded-l-lg disabled:bg-gray-100">Previous</button>
							<button type="button" onClick={goToNextPage} disabled={currentPage === pages} className="border px-2 rounded-r-lg disabled:bg-gray-100">Next</button>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
