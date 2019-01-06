import 'reflect-metadata';
import { isSymbol } from 'util';

const MEMORY_SIZE = 1024 * 64; // 64 KiB 内存
// const _memory = new ArrayBuffer(MEMORY_SIZE);
const MEM = Symbol.for('memory');

const handler: ProxyHandler<Memory> = {
    set: (memory, ptr, value: any) => {
        ptr = parseFloat(ptr as string);

        const data_view = new DataView(memory[MEM]);

        if (typeof ptr === 'number' && (ptr | 0) === ptr) {

            for (let idx = 0; idx < Object.getOwnPropertyNames(value).length; idx++) {
                const name = Object.getOwnPropertyNames(value)[idx];

                const byte_size = value.constructor[Symbol.for(idx.toString())];
                console.log(`${name}: ${byte_size} Byte.`);
                if (byte_size === 1) { data_view.setUint8(ptr, value[name]); }
                if (byte_size === 4) { data_view.setInt32(ptr, value[name]); }
                ptr += byte_size;
            }
            return true;
        } else {
            return false;
        }
    },
    get: (memory, ptr) => {
        if (typeof ptr === 'symbol') { return memory[ptr as any]; }
        if (typeof memory[ptr] === 'function') { return memory[ptr as any]; }
        ptr = parseFloat(ptr as string);
        if (typeof ptr === 'number' && (ptr | 0) === ptr) {
            return new DataView(memory[MEM]).getInt32(ptr, true);
        }
    },
}

export function Int32(target: any, propKey: any, idx: any) {
    target[Symbol.for(idx.toString())] = 4;
}

export function Pointer(target: any, propKey: any, idx: any) {
    target[Symbol.for(idx.toString())] = 1;
}

export const nullptr = -1;
export type nullptr = -1;
export type Pointer = number | nullptr;

export class Memory {
    private [MEM] = new ArrayBuffer(0);

    private constructor(memory_size: number) {
        this[MEM] = new ArrayBuffer(memory_size);
    }

    public static create = (memory_size: number) => new Proxy(new Memory(memory_size), handler)

    public inspect() {
        console.log(new Uint8Array(this[MEM]));
    }
}


export interface Memory {
    [index: number]: any
    [index: string]: any
    // [index: symbol]: any
}

// export function inspect() {
//     console.log(new Int32Array(_memory));
// }

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
    if (typeof value === 'number' && (value | 0) === value) { return 4; }
    if (typeof value === 'object') {
        
    }
    throw new Error('Type is not yet supported');
}

// TODO: 实现内存释放
function free(pointer: number) {
    throw new Error("Function not implemented.");
}

