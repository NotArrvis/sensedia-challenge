import React from 'react';

function Page({ params }: { params: { id: string } }) {
	return <div>BEM VINDO:{params.id}</div>;
}

export default Page;
