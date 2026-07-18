'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateTheme() {
  // Revalidate the entire app layout so theme changes show instantly everywhere
  revalidatePath('/', 'layout');
}
