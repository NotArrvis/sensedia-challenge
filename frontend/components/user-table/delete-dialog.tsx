'use client';
import React from 'react';
import { type MergedData } from '@/components/data-providers/user-table';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

function DeleteDialog({
	user,
	isSelected,
}: {
	user: MergedData;
	isSelected: boolean;
}) {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();
	const deleter = async () => {
		await fetch(`http://localhost:8080/api/v1/users/${user.id}`, {
			method: 'DELETE',
		});
	};
	const router = useRouter();
	const { mutate, isPending } = useMutation({
		mutationKey: ['users'],
		mutationFn: deleter,
		onSuccess: async () => {
			toast.success('Usuário deletado com sucesso');
			await queryClient.invalidateQueries({
				queryKey: ['users'],
			});
			router.refresh();
			setOpen(false);
		},
	});

	return (
		<Dialog modal open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Trash2Icon
					className={
						isSelected
							? 'w-5 h-5 text-[#8556AA] hover:cursor-pointer'
							: ' w-5 h-5 text-transparent '
					}
				/>
			</DialogTrigger>
			<DialogContent className="w-full max-w-sm">
				<DialogHeader>
					<DialogTitle>Deletar Usuário</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Tem certeza que deseja deletar o usuário{' '}
					<strong>{user.name}</strong>?
				</DialogDescription>
				<DialogFooter>
					<div className="flex gap-2">
						<DialogClose asChild>
							<Button variant="link" className="w-full">
								Cancelar
							</Button>
						</DialogClose>
						<Button
							onClick={() => {
								console.log('Deletando usuário');
								mutate();
							}}
							disabled={isPending}
						>
							Deletar
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default DeleteDialog;
