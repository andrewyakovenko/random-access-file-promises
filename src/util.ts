import {RandomAccessFile, RandomAccessFileOptions} from './random-access-file';

export async function withRandomAccessFile<T>(path: string, fn: (raf: RandomAccessFile) => Promise<T>, opts: RandomAccessFileOptions = {}): Promise<T> {
    const raf = new RandomAccessFile(path, opts);
    try {
        return await fn(raf);
    } finally {
        await raf.close();
    }
}
