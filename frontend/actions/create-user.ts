'use server';
import { z } from 'zod';
import { formSchema } from '@/components/schemas/register';

export const createUser = async (data: z.infer<typeof formSchema>) => {
	const parseFields = formSchema.safeParse(data);
	if (!parseFields.success) {
		return {
			error: 'Erro ao criar usuário, os campos passados ao servidor não são válidos',
		};
	}
	const { username, nome, email, cities, days } = parseFields.data;
	const parsedDays = formatDays(days);
	try {
		const userCreation = await fetch(
			'http://localhost:8080/api/v1/users/create',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					id: username,
					name: nome,
					email,
					cities,
					weekdays: parsedDays,
				}),
			}
		);
		return {
			success: true,
		};
	} catch (error) {
		console.log(error);
		return {
			error: 'Erro ao criar usuário',
		};
	}
};

const weekdays: string[] = [
	'segunda',
	'terça',
	'quarta',
	'quinta',
	'sexta',
	'sábado',
	'domingo',
];

const weekDaysOnly: Set<string> = new Set([
	'segunda',
	'terça',
	'quarta',
	'quinta',
	'sexta',
]);

const weekendOnly: Set<string> = new Set(['sábado', 'domingo']);
const allDays: Set<string> = new Set([...weekDaysOnly, ...weekendOnly]);

function formatDays(days: string[]): string {
	const daysSet = new Set(days);

	if (days.length === 0) {
		return '';
	} else if (days.length === 1) {
		return days[0];
	} else if (
		days.length === 5 &&
		[...weekDaysOnly].every((day) => daysSet.has(day))
	) {
		return 'dias úteis';
	} else if (
		days.length === 2 &&
		[...weekendOnly].every((day) => daysSet.has(day))
	) {
		return 'fim de semana';
	} else if (
		days.length === 7 &&
		[...allDays].every((day) => daysSet.has(day))
	) {
		return 'todos';
	} else {
		const sortedDays = days
			.slice()
			.sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));
		return sortedDays.join(', ');
	}
}
