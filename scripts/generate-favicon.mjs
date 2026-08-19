import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';

const outputDirectory = new URL('../public/', import.meta.url);
mkdirSync(outputDirectory, { recursive: true });

const crc32 = (bytes) => {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
};

const chunk = (type, data) => {
  const typeBytes = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])));
  return Buffer.concat([length, typeBytes, data, checksum]);
};

const paintRect = (pixels, size, x, y, width, height, color) => {
  for (let row = Math.max(0, y); row < Math.min(size, y + height); row += 1) {
    for (let column = Math.max(0, x); column < Math.min(size, x + width); column += 1) {
      const offset = (row * size + column) * 4;
      pixels.set(color, offset);
    }
  }
};

const makeIcon = (size) => {
  const pixels = new Uint8Array(size * size * 4);
  const red = [139, 35, 38, 255];
  const ivory = [245, 240, 232, 255];
  const copper = [212, 169, 106, 255];
  const unit = Math.max(1, Math.round(size / 24));

  paintRect(pixels, size, 0, 0, size, size, red);
  // A compact geometric rendition of the "余" brand mark: three beams, a center, and a base line.
  paintRect(pixels, size, 5 * unit, 5 * unit, 14 * unit, 2 * unit, ivory);
  paintRect(pixels, size, 5 * unit, 10 * unit, 14 * unit, 2 * unit, ivory);
  paintRect(pixels, size, 7 * unit, 15 * unit, 10 * unit, 2 * unit, ivory);
  paintRect(pixels, size, 10 * unit, 7 * unit, 2 * unit, 9 * unit, ivory);
  paintRect(pixels, size, 5 * unit, 19 * unit, 14 * unit, unit, copper);

  const scanlines = Buffer.alloc((size * 4 + 1) * size);
  for (let row = 0; row < size; row += 1) {
    const destination = row * (size * 4 + 1);
    scanlines[destination] = 0;
    Buffer.from(pixels).copy(
      scanlines,
      destination + 1,
      row * size * 4,
      (row + 1) * size * 4,
    );
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(scanlines)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
};

for (const [filename, size] of [
  ['favicon-32.png', 32],
  ['favicon-192.png', 192],
  ['apple-touch-icon.png', 180],
]) {
  writeFileSync(new URL(filename, outputDirectory), makeIcon(size));
}
