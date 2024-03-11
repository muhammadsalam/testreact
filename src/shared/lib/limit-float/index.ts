export const limitFloat = (value: string, maxDecimalPlaces: number) => {
    const decimalParts = value.split(/[.,]/);

    if (
        decimalParts.length > 1 &&
        decimalParts[1].length > maxDecimalPlaces
    ) {
        let result =
            decimalParts[0] +
            "." +
            decimalParts[1].slice(0, maxDecimalPlaces);
        return result;
    }

    return value;
}
