export function getFormValue(data: FormData, key: string): string | undefined {
    const value = data.get(key)
    if (typeof value === 'string') {
        return value
    }
    return undefined
}
