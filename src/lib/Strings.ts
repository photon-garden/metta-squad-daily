export function capitalize(s: string): string {
    const [firstLetter, ...rest] = s
    return firstLetter.toUpperCase() + rest.join('')
}