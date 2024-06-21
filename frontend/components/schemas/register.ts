import { z } from 'zod';

export const formSchema = z.object({
	username: z
		.string()
		.min(5, {
			message: 'Username precisa ter pelo menos 5 caracteres',
		})
		.max(22),
	nome: z
		.string()
		.min(5, {
			message: 'O nome precisa conter pelo menos 5 caracteres',
		})
		.max(255),
	email: z.string().email({ message: 'O email não é válido' }),
	cities: z
		.string()
		.min(2, { message: 'Precisa ter no mínimo 2 caracteres' }),
	days: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'Você precisa selecionar ao menos uma opção de dia de semana.',
	}),
});
