import React from 'react';
import TipoQuadra from '../ui/tipo-quadra';
import Nivel from '../ui/nivel';
import Vitorias from '../ui/vitorias';

const Stats = () => {
	return (
		<section className="bg-[#8556AA] p-1 flex flex-col md:flex-row  justify-center">
			<div className="m-9">
				<TipoQuadra />
			</div>
			<div className="m-9">
				<Nivel />
			</div>
			<div className="m-9">
				<Vitorias />
			</div>
		</section>
	);
};

export default Stats;
