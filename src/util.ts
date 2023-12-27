import {RandomAccessFile} from './random-access-file';

export async function withRandomAccessFile(path: string, fn: (raf: RandomAccessFile) => Promise<void>): Promise<void> {
    const raf = new RandomAccessFile(path);
    try {
        await fn(raf);
    } finally {
        await raf.close();
    }
}
