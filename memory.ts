
const MEMORY_SIZE = 1024 * 64; // 64 KiB 内存
const memory = new ArrayBuffer(MEMORY_SIZE);

// suuuuuuuuuper silly memory allocate
let used = 0;
export function malloc(byteLength: number): number {

    if (used + byteLength > MEMORY_SIZE) {
        throw Error('Do not have enough memory!');
    }

    const pointer = used;
    used += byteLength;
    return pointer;
}

export function sizeof(value: any) {
    if (
        typeof value === 'number'
        && (value | 0) === value
    ) {
        return 4;
    } else {
        throw new Error('Type is not yet supported');
    }
}

// TODO: 实现内存释放
function free(pointer: number) {
    throw new Error("Function not implemented.");
}

export type Pointer = number | null;
