export const fetcher = async <T = unknown>(url: string): Promise<T | null> => {
  const res = await fetch(url)

  if (res.status === 204) {
    return null
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
  }

  return res.json()
}
