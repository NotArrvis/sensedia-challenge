import React from 'react';

function MaxWidthWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-center w-full">
			<div className=" sm:max-w-xs md:max-w-md xl:max-w-lg 2xl:max-w-xl ">
				{children}
			</div>
		</div>
	);
}

export default MaxWidthWrapper;
