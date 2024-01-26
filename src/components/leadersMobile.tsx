import { Fragment } from "react";
import Link from "next/link";
import { Leader } from '~/pages/index';

interface LeadersMobileProps {
	leaderList: Leader[];
}

export default function LeadersMobile({ leaderList }: LeadersMobileProps) {
	return leaderList.map(leader =>
		<Fragment key={leader.id}>
			<Link href={`/leader/${leader.id}`}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 p-4 border border-gray-100 rounded-lg shadow-lg cursor-pointer">
					<div className="">
						<label className="text-lg text-gray-700 font-medium border-b-2">Tribe:</label>
						<p>{ leader?.tribe }</p>
					</div>
					<div className="">
						<label className="text-lg text-gray-700 font-medium border-b-2">Leader:</label>
						<p>{`${leader?.firstName} ${leader?.lastName}`}</p>
					</div>
					<div className="">
						<label className="text-lg text-gray-700 font-medium border-b-2">Title:</label>
						<p>{leader?.jobTitle}</p>
					</div>
					<div className="">
						<label className="text-lg text-gray-700 font-medium border-b-2">State:</label>
						<p>{leader?.mailingState}</p>
					</div>
					<div className="md:col-span-2">
						<label className="text-lg text-gray-700 font-medium border-b-2">BIA Agency:</label>
						<p>{leader?.biaAgency}</p>
					</div>
					<div className="md:col-span-2">
						<label className="text-lg text-gray-700 font-medium border-b-2">Full Tribe:</label>
						<p>{leader?.fullTribeName}</p>
					</div>
				</div>
			</Link>
		</Fragment>
	);
}
