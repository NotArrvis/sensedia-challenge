'use client';

import { useEffect } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<section className="flex flex-col items-center justify-center h-[calc(100vh-21.25rem)]">
			<Card>
				<CardHeader>
					<CardTitle>Usuário não encontrado</CardTitle>
				</CardHeader>
				<CardContent>
					<p>
						O usuário não existe, por favor retorne a lista de
						usuários.
					</p>
				</CardContent>
				<CardFooter>
					<Link href="/">
						<Button className="bg-purple-700 text-white hover:bg-purple-900">
							Retornar
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</section>
	);
}
