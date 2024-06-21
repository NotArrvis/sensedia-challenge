'use client';

import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../user-table/data-table';
import { columns } from '../user-table/columns';
import { Loader2 } from 'lucide-react';

export type Users = {
	users: User[];
};
export type User = {
	created_at: string;
	email: string;
	id: string;
	name: string;
	updated_at: string;
	weekdays: string;
	cities: string;
};

export type Posts = {
	posts: Post[];
};
export type Post = {
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	user_id: string;
};
export type Albums = {
	albums: Album[];
};
export type Album = {
	created_at: string;
	description: string;
	id: string;
	name: string;
	updated_at: string;
	user_ids: string[] | null;
};
export type MergedData = {
	posts: number | undefined;
	albums: number | undefined;
	created_at: string;
	email: string;
	id: string;
	name: string;
	weekdays: string;
	cities: string;
	updated_at: string;
};

function UserTableProvider() {
	const fetcher = async () => {
		const data = fetch('http://localhost:8080/api/v1/users').then((res) => {
			return res.json() as Promise<Users>;
		});
		return data;
	};
	const postsFetcher = async () => {
		const data = fetch('http://localhost:8080/api/v1/posts').then((res) => {
			return res.json() as Promise<Posts>;
		});
		return data;
	};
	const albumsFetcher = async () => {
		const data = fetch('http://localhost:8080/api/v1/albums').then(
			(res) => {
				return res.json() as Promise<Albums>;
			}
		);
		return data;
	};

	const { data: postsData, isLoading: postsIsLoading } = useQuery({
		queryKey: ['posts'],
		queryFn: postsFetcher,
	});
	const { data: albumsData, isLoading: albumsIsLoading } = useQuery({
		queryKey: ['albums'],
		queryFn: albumsFetcher,
	});
	const { data, isLoading } = useQuery({
		queryKey: ['users'],
		queryFn: fetcher,
	});
	const mergedData: MergedData[] | undefined = data?.users?.map((user) => {
		return {
			...user,
			posts: postsData?.posts.filter((post) => post.user_id === user.id)
				.length,
			albums: albumsData?.albums.filter((album) =>
				album.user_ids?.includes(user.id)
			).length,
		};
	});
	if (isLoading || postsIsLoading || albumsIsLoading) {
		return (
			<section className="flex items-center justify-center h-[calc(100vh-21.45rem)] w-full">
				<Loader2 className="text-purple-500 animate-spin w-10 h-10" />
			</section>
		);
	}
	if (!mergedData) {
		return <div>No data</div>;
	}
	return <DataTable columns={columns} data={mergedData} />;
}

export default UserTableProvider;
