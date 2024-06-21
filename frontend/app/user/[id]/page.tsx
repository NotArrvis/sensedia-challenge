'use client';
import { type User } from '@/components/data-providers/user-table';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
function Page({ params }: { params: { id: string } }) {
	const fetcher = async () => {
		const res = fetch(
			`http://localhost:8080/api/v1/users/${params.id}`
		).then((res) => {
			return res.json();
		});
		return res;
	};
	const { data, isLoading } = useQuery({
		queryKey: ['user', params.id],
		queryFn: fetcher,
	});
	if (isLoading)
		return (
			<section className=" w-full h-[calc(100vh-21.25rem)] flex items-center justify-center">
				<Card className={'w-[380px]'}>
					<CardHeader>
						<Skeleton className=" h-6" />
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className=" flex flex-col gap-10">
							<div className="space-y-1">
								<Skeleton className=" h-[0.875rem]" />
								<Skeleton className=" h-5" />
							</div>
							<div className="space-y-1">
								<Skeleton className=" h-[0.875rem]" />
								<Skeleton className=" h-5" />
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Skeleton className=" h-10" />
					</CardFooter>
				</Card>
			</section>
		);
	if (!data) return <div>User not found</div>;
	const user = data.user;
	if (!user) return <div>User not found</div>;

	return (
		<div className=" w-full h-[calc(100svh-21.25rem)] flex items-center justify-center">
			<Card className={'w-[380px]'}>
				<CardHeader>
					<CardTitle>{user.name}</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className=" flex flex-col gap-10">
						<div className="space-y-1">
							<p className="text-sm font-medium leading-none">
								ID
							</p>
							<p className="text-sm text-muted-foreground">
								{user.id}
							</p>
						</div>
						<div className="space-y-1">
							<p className="text-sm font-medium leading-none">
								E-mail
							</p>
							<p className="text-sm text-muted-foreground">
								{user.email}
							</p>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Link
						href={'/'}
						className={cn(
							buttonVariants({
								variant: 'link',
								size: 'lg',
							}),
							'w-full uppercase hover:text-purple-700'
						)}
					>
						Voltar a tela de usuários
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}

export default Page;
