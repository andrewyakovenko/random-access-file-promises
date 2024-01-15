# random-access-file-promises
This is a TypeScript wrapper of JS [random-access-file](https://github.com/random-access-storage/random-access-file) library that wraps its callback-based API in Promises.

## Usage example

```js
import {RandomAccessFile} from 'random-access-file-promises';

const file = new RandomAccessFile('path/to/file');
try {
    const buffer = await file.read(42, 10);
    console.log(buffer);
    await file.write(42, Buffer.from('Hello, world!'));
} finally {
    await file.close();
}
```

For convenience, there is also a `withFile` function that automatically closes the file when the callback returns:

```js
import {withFile} from 'random-access-file-promises';

await withFile('path/to/file', async (file) => {
    const buffer = await file.read(42, 10);
    console.log(buffer);
    await file.write(42, Buffer.from('Hello, world!'));
});
```

## API

### `class RandomAccessFile`

#### `constructor(path: string, options?: Options)`
Creates a new instance of `RandomAccessFile` class.

#### `read(offset: number, size: number): Promise<Buffer>`
Reads `size` bytes from the file at the given `offset`.

#### `write(offset: number, buffer: Buffer): Promise<void>`
Writes `buffer` to the file at the given `offset`.

#### `stat(): Promise<Stats>`
Returns the file stats, currently only `size` is supported.

#### `truncate(length: number): Promise<void>`
Truncates the file to the given `length`.

#### `del(offset: number, length: number): Promise<void>`
Deletes `length` bytes from the file at the given `offset`.

#### `close(): Promise<void>`
Closes the file.

#### `unlink(): Promise<void>`
Unlinks the file, removes the directories up to `opts.directory` if `opts.rmdir` is set to `true`

#### `static createPool(maxSize: number): Pool`
Creates a new `Pool` instance of size `maxSize`.

### `withFile<T>(path: string, callback: (file: RandomAccessFile) => Promise<T>, opts?: RandomAccessFileOptions): Promise<T>`
Opens the file, calls the callback with the file instance and closes the file when the callback returns or errors out. Returns whatever the callback has returned.

### `interface RandomAccessFileOptions`
Options for `RandomAccessFile` class.

#### `size?: number`
Initial size of the file.

#### `truncate?: boolean`
Specifies if the file should be truncated if `opts.size` is not provided.

#### `directory?: string`
Directory to resolve the file in. Also acts as root directory if `opts.rmdir` is set to `true`.

#### `readable?: boolean`
Specifies if the file should be opened in read mode.
Both `readable` and `writable` set to `true` results in `RW` mode.
Both `readable` and `writable` set to `false` results in `W` mode.

#### `writable?: boolean`
Specifies if the file should be opened in write mode. 
Both `readable` and `writable` set to `true` results in `RW` mode.
Both `readable` and `writable` set to `false` results in `W` mode.

#### `pool?: Pool`
Specify the pool to which this file belongs. Pool cam be created with `createPool` function.

#### `rmdir?: boolean`
Specifies if the directory should be removed when the file is unlinked.

#### `lock?: boolean`
Specifies if a process-level lock should be acquired on the file. Files open in readonly mode provide a `shared` flag to `flock`.

#### `sparse?: boolean`
Specifies if the file should be marked as a sparse file. May be required for `del` operation.

#### `alloc?: (size: number) => Buffer`
Buffer allocation function.`Buffer.allocUnsafe` is used by default.
