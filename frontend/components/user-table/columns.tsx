'use client';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MergedData } from '../data-providers/user-table';
import Link from 'next/link';
import DeleteDialog from './delete-dialog';

export const columns: ColumnDef<MergedData>[] = [
	{
		accessorKey: 'id',
		header: 'USER',
		cell: ({ row }) => {
			const user = row.original;
			return (
				<Link
					href={`/user/${user.id}`}
					className="hover:cursor-pointer"
				>
					<p className=" !text-[#3D3D3D] font-semibold  !truncate max-w-[15ch] max-sm:max-w-[10ch]">
						{user.id}
					</p>
				</Link>
			);
		},
	},
	{
		accessorKey: 'name',
		header: 'NOME',
		cell: ({ row }) => {
			const user = row.original;
			return (
				<p className="truncate max-w-[20ch] max-sm:max-w-[10ch]">
					{user.name}
				</p>
			);
		},
	},
	{
		accessorKey: 'email',
		header: 'E-MAIL',
		cell: ({ row }) => {
			const user = row.original;
			return (
				<p className="truncate max-w-[25ch] max-sm:max-w-[10ch]">
					{user.email}
				</p>
			);
		},
	},
	{
		accessorKey: 'cities',
		header: 'CIDADE',
		cell: ({ row }) => {
			const user = row.original;
			return <p className="truncate max-w-[40ch]">{user.cities}</p>;
		},
	},
	{
		accessorKey: 'weekdays',
		header: 'DIAS DA SEMANA',
		cell: ({ row }) => {
			const user = row.original;
			return <p className="truncate max-w-[40ch]">{user.weekdays}</p>;
		},
	},
	{
		accessorKey: 'posts',
		header: 'POSTS',
	},
	{
		accessorKey: 'albums',
		header: 'ÁLBUNS',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const user = row.original;
			const isSelected = row.getIsSelected();
			return <DeleteDialog user={user} isSelected={isSelected} />;
		},
	},
];
