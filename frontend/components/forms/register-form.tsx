'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../schemas/register';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/actions/create-user';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const days = [
	{
		label: 'Seg',
		value: 'segunda',
	},
	{
		label: 'Ter',
		value: 'terça',
	},
	{
		label: 'Qua',
		value: 'quarta',
	},
	{
		value: 'quinta',
		label: 'Qui',
	},
	{
		label: 'Sex',
		value: 'sexta',
	},
	{
		label: 'Sáb',
		value: 'sábado',
	},
	{
		label: 'Dom',
		value: 'domingo',
	},
];

function RegisterForm() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			nome: '',
			email: '',
			cities: '',
			days: [],
		},
	});
	const { mutate, isPending } = useMutation({
		mutationKey: ['register', 'users'],
		mutationFn: (data: z.infer<typeof formSchema>) => createUser(data),
		onSuccess: () => {
			toast.success('Registro realizado com sucesso!');
			queryClient.invalidateQueries({ queryKey: ['users'] });
			router.push('/');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	function onSubmit(data: z.infer<typeof formSchema>) {
		mutate(data);
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle className="uppercase font-medium text-[#919191] text-sm ">
					Registro
				</CardTitle>
			</CardHeader>
			<CardContent className="lg:min-w-[50rem] ">
				<Form {...form}>
					<form
						className="flex flex-col gap-y-12"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="flex gap-16">
							<div className="flex flex-col gap-4 w-1/2">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder="Nome de usuário*"
													className="border-x-[0px] border-t-[0] border-b-[1px] rounded-none border-[#9E9E9E] offset-y-[1px] bg-[#3D3D3D]/[.06]"
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="nome"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder="Nome completo*"
													{...field}
													className="border-x-[0px] border-t-[0] border-b-[1px] rounded-none border-[#9E9E9E] offset-y-[1px] bg-[#3D3D3D]/[.06]"
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder="E-mail*"
													{...field}
													className="border-x-[0px] border-t-[0] border-b-[1px] rounded-none border-[#9E9E9E] offset-y-[1px] bg-[#3D3D3D]/[.06]"
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex flex-col gap-4 w-1/2">
								<FormField
									control={form.control}
									name="cities"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder="Cidade*"
													{...field}
													className=" border-x-[0px] border-t-[0] border-b-[1px] rounded-none border-[#9E9E9E] offset-y-[1px] bg-[#3D3D3D]/[.06]"
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="days"
									render={({ field }) => (
										<FormItem>
											<FormLabel className=" uppercase font-medium text-[#919191] text-sm pb-4">
												Dias da semana
											</FormLabel>
											<div className=" flex flex-wrap w-[25.625rem] gap-[1.375rem] pl-2">
												{days.map((item) => (
													<FormField
														key={item.value}
														control={form.control}
														name="days"
														render={({ field }) => {
															return (
																<FormItem
																	key={
																		item.value
																	}
																	className="flex flex-row items-start space-x-3 space-y-0"
																>
																	<FormControl>
																		<Checkbox
																			className="data-[state=checked]:bg-[#7E50CE] border-[#7E50CE] w-4 h-4"
																			checked={field.value?.includes(
																				item.value
																			)}
																			onCheckedChange={(
																				checked
																			) => {
																				return checked
																					? field.onChange(
																							[
																								...field.value,
																								item.value,
																							]
																					  )
																					: field.onChange(
																							field.value?.filter(
																								(
																									value
																								) =>
																									value !==
																									item.value
																							)
																					  );
																			}}
																		/>
																	</FormControl>
																	<FormLabel className="text-sm font-normal">
																		{
																			item.label
																		}
																	</FormLabel>
																</FormItem>
															);
														}}
													/>
												))}
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className="">
							<Button
								type="submit"
								className=" uppercase bg-[#7E50CE] rounded-[1.3125rem] hover:bg-[#7250CE]"
							>
								registrar
							</Button>
							<Button
								variant={'ghost'}
								type="button"
								className=" text-[#7E50CE] hover:text-[#7250CE] uppercase"
							>
								cancelar
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default RegisterForm;
