import {RandomAccessFile, RandomAccessFileOptions} from './random-access-file';

export async function withRandomAccessFile(path: string, fn: (raf: RandomAccessFile) => Promise<void>, opts: RandomAccessFileOptions = {}): Promise<void> {
    const raf = new RandomAccessFile(path, opts);
    try {
        await fn(raf);
    } finally {
        await raf.close();
    }
}
