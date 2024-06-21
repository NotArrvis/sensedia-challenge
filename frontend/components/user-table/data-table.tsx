'use client';

import {
	ColumnDef,
	SortingState,
	VisibilityState,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
	});
	const pageCount = table.getPageCount();
	const pageIndex = table.getState().pagination.pageIndex;

	const startPage = Math.max(0, pageIndex - 2);
	const endPage = Math.min(pageCount - 1, pageIndex + 2);

	const pageButtons = [];
	for (let i = startPage; i <= endPage; i++) {
		pageButtons.push(
			<Button
				key={i}
				variant={'outline'}
				className={`
          rounded-[1.125rem] uppercase bg-transparent hover:bg-[#9E9E9E] border border-[#9E9E9E] text-xs font-medium 
          ${i === pageIndex ? 'bg-[#9E9E9E] text-white' : ''}
          ${i === startPage ? 'rounded-l-[1.125rem] rounded-r-none' : ''} 
          ${i === endPage ? 'rounded-r-[1.125rem] rounded-l-none' : ''} 
          ${i !== startPage && i !== endPage ? 'rounded-none' : ''} 
        `}
				onClick={() => table.setPageIndex(i)}
			>
				{i + 1}
			</Button>
		);
	}
	function generatePages(): number[] {
		const pages = Array.from(
			{ length: table.getPageCount() },
			(_, i) => i + 1
		);

		return pages;
	}
	return (
		<div className="flex flex-col min-w-full items-center justify-center ">
			<div className="flex items-center justify-between min-w-full relative">
				<div className="flex items-center py-6 max-sm:px-4 max-sm:max-w-[20rem] sm:w-[44rem] md:w-[60rem] xl:w-[72rem] 2xl:w-[73rem]   ">
					<Input
						placeholder="Procurar"
						value={
							(table
								.getColumn('name')
								?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table
								.getColumn('name')
								?.setFilterValue(event.target.value)
						}
						className="  border-x-[0px] border-t-[0] border-b-[1px] rounded-none border-[#9E9E9E] offset-y-[1px] bg-[#3D3D3D]/[.06]"
					/>
					<MagnifyingGlassIcon className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5 text-[#919191]" />
				</div>
			</div>
			<div className="rounded-md border-t-[1px] border-b-[1px] border-[#C4C4C4] min-w-full max-sm:px-4 max-sm:max-w-[20rem] sm:w-[44rem] md:w-[60rem] xl:w-[72rem] 2xl:w-[73rem] sm:h-[12rem] md:h-[14rem] xl:h-[15rem] 2xl:h-[15rem]">
				<Table className="min-w-full table-auto">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && 'selected'
									}
									onMouseEnter={(val) =>
										row.toggleSelected(!!val)
									}
									onMouseLeave={() =>
										row.toggleSelected(false)
									}
									className=""
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="text-[#6A6A6A] "
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex max-sm:flex-col max-sm:justify-center w-full items-center justify-between gap-2 flex-wrap  max-sm:px-4 max-sm:max-w-[20rem]  sm:w-[24rem] md:w-[40rem] xl:w-[50rem] 2xl:w-[68rem]  sm:my-8">
				<div className=" uppercase font-medium text-xs max-sm:self-start max-sm:my-2">
					Total <span className=" text-sm">{data.length}</span>
				</div>
				<div className=" max-sm:w-64 max-sm:justify-center sm:w-72 md:w-96 flex items-center gap-4">
					<Button
						variant={'outline'}
						className="rounded-[1.125rem] uppercase bg-transparent hover:bg-[#9E9E9E] border border-[#9E9E9E] text-xs font-medium max-sm:hidden"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>

					{pageIndex > 2 && (
						<Button
							variant={'outline'}
							className="rounded-full uppercase bg-transparent hover:bg-[#9E9E9E] w-9 h-9 border border-[#9E9E9E]"
							onClick={() => table.setPageIndex(0)}
						>
							1
						</Button>
					)}
					{pageIndex > 0 && pageIndex < pageCount - 1 && (
						<span className="max-sm:hidden">...</span>
					)}

					<div className="flex">
						{pageIndex === pageCount - 1 && (
							<Button
								variant={'outline'}
								className={`rounded-[1.125rem] uppercase bg-transparent hover:bg-[#9E9E9E] border border-[#9E9E9E] text-xs font-medium rounded-r-none ${
									pageIndex - 2 === pageIndex
										? 'bg-[#9E9E9E] text-white'
										: ''
								}`}
								onClick={() =>
									table.setPageIndex(pageIndex - 2)
								}
							>
								{pageIndex - 1}
							</Button>
						)}
						{pageIndex > 0 && (
							<Button
								variant={'outline'}
								className={`rounded-[1.125rem] uppercase bg-transparent hover:bg-[#9E9E9E] border border-[#9E9E9E] text-xs font-medium rounded-r-none ${
									pageIndex - 1 === pageIndex
										? 'bg-[#9E9E9E] text-white'
										: ''
								} ${
									pageIndex - 1 === pageCount - 2
										? 'rounded-l-none'
										: ''
								}`}
								onClick={() =>
									table.setPageIndex(pageIndex - 1)
								}
							>
								{pageIndex}
							</Button>
						)}

						<Button
							variant={'outline'}
							className={`uppercase bg-transparent hover:bg-[#9E9E9E] border border-[#9E9E9E] text-xs font-medium ${
								pageIndex === 0
									? 'rounded-l-[1.125rem] rounded-r-none'
									: pageIndex === pageCount - 1
									? 'rounded-r-[1.125rem] rounded-l-none'
									: 'rounded-none'
							} ${
								pageIndex === pageIndex
									? 'bg-[#9E9E9E] text-white'
									: ''
							}`}
							onClick={() => table.setPageIndex(pageIndex)}
						>
							{pageIndex + 1}
						</Button>

						{pageIndex < pageCount - 1 && (
							<Button
								variant={'outline'}
								className={`rounded-[1.125rem] uppercase bg-transparent hover:bg-[#9E9E9E] border border-[#9E9E9E] text-xs font-medium rounded-l-none ${
									pageIndex + 1 === pageIndex
										? 'bg-[#9E9E9E] text-white'
										: ''
								} ${
									pageIndex + 1 === 1 ? 'rounded-r-none' : ''
								}`}
								onClick={() =>
									table.setPageIndex(pageIndex + 1)
								}
							>
								{pageIndex + 2}
							</Button>
						)}

						{pageIndex === 0 && (
							<Button
								variant={'outline'}
								className={`rounded-[1.125rem] uppercase bg-transparent hover:bg-[#9E9E9E] border border-[#9E9E9E] text-xs font-medium rounded-l-none ${
									pageIndex + 2 === pageIndex
										? 'bg-[#9E9E9E] text-white'
										: ''
								}`}
								onClick={() =>
									table.setPageIndex(pageIndex + 2)
								}
							>
								{pageIndex + 3}
							</Button>
						)}
					</div>

					{pageIndex < pageCount - 1 && (
						<span className="max-sm:hidden">...</span>
					)}

					{pageIndex < pageCount - 2 && (
						<Button
							variant={'outline'}
							className="rounded-full uppercase bg-transparent hover:bg-[#9E9E9E] w-9 h-9 border border-[#9E9E9E]"
							onClick={() => table.setPageIndex(pageCount - 1)}
						>
							{pageCount}
						</Button>
					)}

					<Button
						variant={'outline'}
						className="rounded-[1.125rem] uppercase bg-transparent hover:bg-[#9E9E9E] border border-[#9E9E9E] text-xs font-medium max-sm:hidden"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Próximo
					</Button>
				</div>
				<div className=" flex items-center gap-4 max-sm:self-start max-sm:my-2">
					<div className=" uppercase font-medium text-xs text-left w-14">
						Ir para a página
					</div>
					<select
						onChange={(e) =>
							table.setPageIndex(Number(e.target.value) - 1)
						}
						className=" w-10 bg-transparent border-b"
						value={table.getState().pagination.pageIndex + 1}
					>
						{generatePages().map((page) => (
							<option
								key={page}
								value={page}
								className=" text-sm"
							>
								{page}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}
