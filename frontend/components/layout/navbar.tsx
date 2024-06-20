import React from 'react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Sensedia from '../ui/sensedia';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GridIcon, QuestionIcon } from '../ui/buttons';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

const Navbar = () => {
	return (
		<nav className="w-full flex justify-between">
			<div className="flex  items-center justify-center md:justify-start p-5  gap-2 max-sm:max-w-sm">
				<Sensedia />
				<div className="md:m-2 flex align-middle font-bold text-2xl ">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink
									href="/"
									className="text-[#8556AA]"
								>
									BEM-VINDO
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href="/components">
									Registro
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>
			<div className="flex items-center justify-center px-4 md:hidden">
				<Sheet>
					<SheetTrigger>
						<HamburgerMenuIcon className="w-4 h-4" />
					</SheetTrigger>

					<SheetContent className="bg-[#3D3D3D] border-[#3D3D3D] text-white">
						<SheetHeader>
							<SheetTitle className="text-white">MENU</SheetTitle>
						</SheetHeader>
						<ul>
							<li className="flex items-center py-4 px-6 hover:bg-gray-700 relative group">
								<span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[80%] rounded-r-md w-1 bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
								<span className="text-white">
									Lista de amigos
								</span>
							</li>
							<li className="flex items-center py-4 px-6 hover:bg-gray-700 relative group">
								<span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[80%] rounded-r-md w-1 bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
								<span className="text-white">
									Artigos salvos
								</span>
							</li>
							<li className="flex items-center py-4 px-6 hover:bg-gray-700 relative group">
								<span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[80%] rounded-r-md w-1 bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
								<span className="text-white">Notificações</span>
							</li>
							<li className="flex items-center py-4 px-6 hover:bg-gray-700 relative group">
								<span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[80%] rounded-r-md w-1 bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
								<span className="text-white">Preferências</span>
							</li>
							<li className="flex items-center py-4 px-6 hover:bg-gray-700 relative group">
								<span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[80%] rounded-r-md w-1 bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
								<span className="text-white">
									Fechar sessão
								</span>
							</li>
						</ul>
					</SheetContent>
				</Sheet>
			</div>
			<div className="hidden md:flex gap-6 justify-center items-center px-12">
				<div className="flex items-center justify-center">
					<QuestionIcon />
					<GridIcon />
				</div>
				<div className="flex gap-6 items-center justify-center border-l-[2px]">
					<Avatar className="ml-1">
						<AvatarImage>UN</AvatarImage>
						<AvatarFallback className="bg-[#8556AA] text-white">
							UN
						</AvatarFallback>
					</Avatar>
					<DropdownMenu>
						<DropdownMenuTrigger className="pr-4">
							Nome de usuario
						</DropdownMenuTrigger>
						<DropdownMenuContent className=" mt-2 w-56 bg-[#3D3D3D] text-white border-none">
							<DropdownMenuItem className="flex item-center py-2 px-4 relative group hover:cursor-pointer">
								<span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[80%] rounded-r-md w-1 bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
								Lista de amigos
							</DropdownMenuItem>
							<DropdownMenuItem className="flex item-center py-2 px-4 relative group hover:cursor-pointer">
								<span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[80%] rounded-r-md w-1 bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
								Artigos salvos
							</DropdownMenuItem>
							<DropdownMenuItem className="flex item-center py-2 px-4 relative group hover:cursor-pointer">
								<span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[80%] rounded-r-md w-1 bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
								Notificações
							</DropdownMenuItem>
							<DropdownMenuItem className="flex item-center py-2 px-4 relative group hover:cursor-pointer">
								<span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[80%] rounded-r-md w-1 bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
								Preferências
							</DropdownMenuItem>
							<DropdownMenuItem className="flex item-center py-2 px-4 relative group hover:cursor-pointer">
								<span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[80%] rounded-r-md w-1 bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
								Fechar sessão
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
