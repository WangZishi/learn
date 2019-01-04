
interface List<T> {
    get(index: number): T;
    has(value: T): boolean;
    append(value: T): void;
    insert(value: T, index: number): void;
    delete(index: number): void;
}

const MEMORY_SIZE = 1024 * 64; // 64 KiB 内存
const memory = new ArrayBuffer(MEMORY_SIZE); // 64 KiB 内存

// suuuuuuuuuper silly memory allocate
let used = 0;
function malloc(byteLength: number): number {

    if (used + byteLength > MEMORY_SIZE) {
        throw Error('Do not have enough memory!');
    }

    const pointer = used;
    used += byteLength;
    return pointer;
}

class LinkedNode<T> {
    constructor(
        private value: T,             // 32 bit
        private next: number | null,  //  8 bit
    ) { }
}

//  p
//  |              |<--------------------------<-|
// [v][v][v][p][ ][v][v][v][·][ ][ ][ ][v][v][v][p][ ][ ][ ][ ][ ][ ]
//           |->------------------------>|
//

class LinkedList<T> implements List<T> {
    private byteLength = 4; // 实现 32 bit 数据存储

    constructor() { }

    // private 

    private getValueFromMemory(pointer: number): T {
        // return new DataView(
        //     this.mem.slice(pointer, pointer + this.byteLength),
        // ).getInt32(pointer) as unknown as T;
    }

    private setValueToMemory(value: T): number {
        const p = malloc(4);
        // memory[p] = value;
        new DataView(memory).setInt32()
    }

    public get(index: number): T {
        throw new Error("Method not implemented.");
    }

    public has(value: T): boolean {
        throw new Error("Method not implemented.");
    }

    public append(value: T): void {
        const prevNode = this.getLastNodePointer() as number | null;
        if (!prevNode) {
            const nextNode = new LinkedNode(value, null);
        } else {
            const nextNode = new LinkedNode(value, prevNode);

        }
        throw new Error("Method not implemented.");
    }
    public insert(value: T, index: number): void {
        throw new Error("Method not implemented.");
    }
    public delete(index: number): void {
        throw new Error("Method not implemented.");
    }
}

//-----------------------TEST-------------------//

const list = new LinkedList<number>();

list.append(1);
list.append(2);
list.append(3);
list.append(4);

list.insert(0, 2);

list get()




