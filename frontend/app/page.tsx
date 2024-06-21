import React from 'react';
import UserTableProvider from '@/components/data-providers/user-table';
import MaxWidthWrapper from '@/components/ui/max-width-wrapper';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const Page = () => {
	return (
		<>
			<div className="flex flex-col justify-center items-center ">
				<div className="sm:w-[36rem] md:w-[44rem] lg:w-[64rem] xl:w-[72rem]">
					<div className="flex items-center justify-between w-full pt-5">
						<h1 className="text-2xl font-semibold self-start  ">
							Usuários
						</h1>
						<Link
							href={'/user/new'}
							className={cn(
								buttonVariants({
									className:
										'bg-[#7E50CE] rounded-[1.3125rem] hover:bg-[#7250CE]',
								}),
								'bg-[#7E50CE] rounded-[1.3125rem] hover:bg-[#7250CE]'
							)}
						>
							Registrar novo usuário
						</Link>
					</div>
					<MaxWidthWrapper>
						<UserTableProvider />
					</MaxWidthWrapper>
				</div>
			</div>
		</>
	);
};

export default Page;
