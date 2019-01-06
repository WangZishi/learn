import 'reflect-metadata';
import { Int32, malloc, Memory, nullptr, Pointer, sizeof } from './memory';

const memory = Memory.create(64);

interface List<T> {
    get(index: number): T;
    has(value: T): boolean;
    append(value: T): void;
    insert(value: T, index: number): void;
    delete(index: number): void;
}

class LinkedNode<T extends number> {
    constructor(
        @Int32 public value: T,
        @Pointer public next: Pointer = nullptr,
    ) {
        const ptr = malloc(sizeof(this));
    }

}

const node = new LinkedNode(110, 5);

memory[0] = node;

// malloc(memory, 5);
memory.inspect();

//  p
//  |              |<--------------------------<-|
// [v][v][v][p][ ][v][v][v][·][ ][ ][ ][v][v][v][p][ ][ ][ ][ ][ ][ ]
//           |->------------------------>|
//

// const node = new LinkedNode(1);
// console.log(inspect());

class LinkedList<T extends number> implements List<T> {
    private head?: LinkedNode<T>;
    constructor() { }

    // private * getNext() {
    //     return null;
    // }

    private getLast(): Pointer {
        let result = nullptr;
        let current = this.head;
        while (current && current.next !== nullptr) {
            result = current.next;

        }

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




