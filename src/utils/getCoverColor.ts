import Jimp from 'jimp';

export async function getCoverColor(coverUri: string) {
    const image = await Jimp.read(coverUri).catch(() => null);
    if (!image) return null;
    const averageColor = image.bitmap.data.reduce(
        (acc, component, index) => {
            const componentIndex = index % 4;
            // every 4th component is alpha
            if (componentIndex === 3) return acc;
            const pixelIndex = Math.floor(index / 3);
            acc[componentIndex] = (acc[componentIndex] * pixelIndex + component) / (pixelIndex + 1);
            return acc;
        },
        [0, 0, 0]
    );
    return `#${covertToHex(averageColor)}5e`;
}

const covertToHex = (array: number[]) =>
    array.map((number) => Math.round(number).toString(16).padStart(2, '0')).join('');
