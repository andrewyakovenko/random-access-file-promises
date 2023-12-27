const RAF = require('random-access-file');

export type RandomAccessFileEventType = 'open' | 'close' | 'unlink';

export class RandomAccessFile {
    constructor(path: string) {
        this.raf = new RAF(path);
    }

    private readonly raf: any;

    public read(offset: number, length: number): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            this.raf.read(offset, length, (err: any, buffer: Buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });
    }

    public write(offset: number, buffer: Buffer): Promise<void> {
        return new Promise((resolve, reject) => {
            this.raf.write(offset, buffer, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public del(offset: number, length: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.raf.del(offset, length, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public truncate(length: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.raf.truncate(length, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public stat(): Promise<{ size: number }> {
        return new Promise((resolve, reject) => {
            this.raf.stat((err: any, stat: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stat);
                }
            });
        });
    }

    public close(onClose?: () => void): Promise<void> {
        return new Promise((resolve, reject) => {
            this.raf.close((err: any) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        if (onClose) {
                            onClose();
                        }
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        });
    }

    public unlink(onClose?: () => void): Promise<void> {
        return new Promise((resolve, reject) => {
            this.raf.unlink((err: any) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        if (onClose) {
                            onClose();
                        }
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        });
    }

    public on(event: RandomAccessFileEventType, listener: (...args: any[]) => void): void {
        this.raf.on(event, listener);
    }
}
