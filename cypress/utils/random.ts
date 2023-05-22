/**
 * Generates a random hash string. 
 * 
 * @returns A random hash string.
 */
const getRandomHash = (): string => Math.random().toString(36).substring(7);

/**
 * Returns a new array containing N random elements determined by the num param.
 * 
 * @param num The number of random elements to be returned.
 * @param array The array to be scaned. 
 * @returns An array of N random elements.
 */
export const getNRandomElementsFrom = (num: number, array: Array<any>): Array<any> => {
    const shuffled = array.sort(() => .5 - Math.random());

    return shuffled.slice(0, num);
};

/**
 * Returns a random element from the given array.
 * 
 * @param array The array to be scaned.
 * @returns An array of N random elements 
 */
export const getRandomElementFrom = (array: Array<any>): any =>
    array[Math.floor(Math.random() * array.length)];

/**
 * Generates a random email using the given prefix and domain.
 * 
 * @param prefix The email prefix.
 * @param domain The email domain.
 * @returns A random email.
 */
export const getRandomEmail = (prefix: string, domain: string): string =>
    `${prefix}-${getRandomHash()}@${domain}`;

export default { getNRandomElementsFrom, getRandomElementFrom, getRandomEmail };
