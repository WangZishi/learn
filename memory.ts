
const MEMORY_SIZE = 1024 * 64; // 64 KiB 内存
const _memory = new ArrayBuffer(MEMORY_SIZE);

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

export const nullptr = -1;
export type nullptr = -1;
export type Pointer = number | nullptr;

export const memory = new Proxy(new DataView(_memory), {
    set: (mem, ptr, value) => {
        ptr = parseFloat(ptr as string);
        if (typeof ptr === 'number' && (ptr | 0) === ptr) {
            mem.setInt32(ptr, value, true);
            return true;
        } else {
            return false;
        }
    },
    get: (mem, ptr) => {
        ptr = parseFloat(ptr as string);
        if (typeof ptr === 'number' && (ptr | 0) === ptr) {
            return mem.getInt32(ptr, true);
        }
    }
}) as Memory;

interface Memory extends DataView {
    [index: number]: number | null
}

export function inspect() {
    console.log(new Int32Array(_memory));
}
