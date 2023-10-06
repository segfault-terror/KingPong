'use client'

import Lottie from 'lottie-react';
import myGhost from '@/../public/lottie/ghost.json';

export default function Ghost( { className }: { className: string } ) {
	return (
		<div className={className}>
			<Lottie animationData={myGhost} loop={true} />
		</div>
	);
}
