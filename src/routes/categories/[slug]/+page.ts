import { error } from '@sveltejs/kit'
import type { Categories, Post } from '$lib/types'

export async function load({ params, fetch }) {
	try {
		const response = await fetch('/api/posts')
		let posts: Post[] = await response.json()

		posts = posts.filter((post) => post.categories.includes(params.slug as Categories))

		return {
			posts,
			slug: params.slug
		}
	} catch (err) {
		throw error(404, `Couldn't found the post.`)
	}
}
