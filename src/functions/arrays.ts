export function embaralhar<T>(elementos: T[]): T[] {
    return elementos
        .map(elemento => ({elemento, randomPosition: Math.random()}))
        .sort((o1, o2) => o1.randomPosition - o2.randomPosition)
        .map(elemento => elemento.elemento)
}