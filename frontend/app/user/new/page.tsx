import React from 'react';
import RegisterForm from '@/components/forms/register-form';
function Page() {
	return (
		<section className="min-w-full min-h-full flex flex-col items-center justify-center xl:min-h-[calc(100vh-21.25rem)]">
			<RegisterForm />;
		</section>
	);
}

export default Page;
