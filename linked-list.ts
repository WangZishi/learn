import { malloc, Pointer, sizeof, memory, inspect, nullptr } from './memory';

interface List<T> {
    get(index: number): T;
    has(value: T): boolean;
    append(value: T): void;
    insert(value: T, index: number): void;
    delete(index: number): void;
}

class LinkedNode<T extends number> {
    constructor(
        public value: T,
        public next: Pointer = nullptr,
    ) {
        const pointer = malloc(sizeof(value) + sizeof(next));
        memory[pointer] = value;
        memory[pointer + sizeof(value)] = next;
    }
}

// function () { }

//  p
//  |              |<--------------------------<-|
// [v][v][v][p][ ][v][v][v][·][ ][ ][ ][v][v][v][p][ ][ ][ ][ ][ ][ ]
//           |->------------------------>|
//

const node = new LinkedNode(1);
console.log(inspect());

class LinkedList<T extends number> implements List<T> {
    private byteLength = 4; // 实现 32 bit 数据存储
    private head: LinkedNode<T> | null = null;
    constructor() { }

    // private getValueFromMemory(pointer: number): T {
    //     // return new DataView(
    //     //     this.mem.slice(pointer, pointer + this.byteLength),
    //     // ).getInt32(pointer) as unknown as T;
    // }

    // private setValueToMemory(value: T): number {
    //     // const p = malloc(4);
    //     // // memory[p] = value;
    //     // new DataView(memory).setInt32()
    // }

    private getNext() {

    }

    private getLast(): Pointer {
        if (this.head) {
            this.head.next;
            return this.head.next;
        } else {
            return nullptr;
        }
    }

    public get(index: number): T {
        throw new Error("Method not implemented.");
    }

    public has(value: T): boolean {
        throw new Error("Method not implemented.");
    }

    public append(value: T): void {
        const prevNode = this.getLast();
        if (!prevNode) {
            const nextNode = new LinkedNode(value, nullptr);
        } else {
            const nextNode = new LinkedNode(value, prevNode);
        }
        //----- 等价于-----//
        const nextNode = new LinkedNode(value, this.getLast());

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

// const list = new LinkedList<number>();

// list.append(1);
// list.append(2);
// list.append(3);
// list.append(4);

// list.insert(0, 2);

// list get()




