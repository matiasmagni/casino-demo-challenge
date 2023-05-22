export const capitalize = (str: string) => {
    const lowerCaseStr = str.toLowerCase();

    return str.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
}

export const camelize = (str: string) => str.replace(
    /(?:^\w|[A-Z]|\b\w)/g,
    (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()
).replace(/\s+/g, '');

export default { capitalize, camelize };
