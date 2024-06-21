import React from 'react';
import UserTableProvider from '@/components/data-providers/user-table';
import MaxWidthWrapper from '@/components/ui/max-width-wrapper';
const Page = () => {
	return (
		<MaxWidthWrapper>
			<UserTableProvider />
		</MaxWidthWrapper>
	);
};

export default Page;
