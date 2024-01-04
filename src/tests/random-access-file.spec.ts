import {RandomAccessFile} from '../random-access-file';

it('should write and read a file at a zero offset', async () => {
    const path = '/tmp/random-access-file.spec.ts';
    const raf = new RandomAccessFile(path, {writable: true, readable: true});
    const buffer = Buffer.from('hello world');
    await raf.write(0, buffer);
    const readBuffer = await raf.read(0, buffer.length);
    expect(readBuffer.toString()).toEqual(buffer.toString());
    await raf.close();
});
