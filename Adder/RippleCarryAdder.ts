import { Bit } from "./Bit"
import { FullAdder } from "./FullAdder"

type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : [];

type RippleCarryAdder<
    A extends Array<Bit>,
    B extends Array<Bit>,
    Cin extends Bit = 0,
    Sum extends Array<Bit> = []
> = A extends [infer X extends Bit, ...infer RestA extends Array<Bit>]
        ? B extends [infer Y extends Bit, ...infer RestB extends Array<Bit>]
            // Add the first element of A and B with the full adder
            // Extract the carry out and sum from the full adder
            ? FullAdder<X, Y, Cin> extends [infer Cout extends Bit, infer S extends Bit]
                // Add the remaining bits
                ? RippleCarryAdder<RestA, RestB, Cout, [S, ...Sum]>
                : never
            : never
        : Cin extends 1
            ? [1, ...Sum]
            : Sum

// Why reverse?
// Because our Ripple Carry Adder works by adding the left most bit first.
// That's why we need to reverse our input so the right most bit becomes,
// the left most bit.
type A = Reverse<[1, 1, 0, 1]> // 13
type B = Reverse<[0, 1, 1, 1]> // 7
type Result = RippleCarryAdder<A, B> // Resolves to 20
