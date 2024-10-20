import Jimp from 'jimp';

export async function getCoverColor(coverUri: string) {
    const image = await Jimp.read(coverUri).catch(() => null);
    if (!image) return null;

    // 4 components, once every 5 pixels
    const STEP = 20;

    let rTotal = 0;
    let gTotal = 0;
    let bTotal = 0;
    let total = 0;

    for (let i = 0; i < image.bitmap.data.length; i += STEP) {
        rTotal += image.bitmap.data[i];
        gTotal += image.bitmap.data[i + 1];
        bTotal += image.bitmap.data[i + 2];
        // Forth component is alpha, which we don't care about
        total++;
    }

    return `#${covertToHex([
        Math.round(rTotal / total),
        Math.round(gTotal / total),
        Math.round(bTotal / total),
    ])}5e`;
}

const covertToHex = (array: number[]) =>
    array.map((number) => Math.round(number).toString(16).padStart(2, '0')).join('');
