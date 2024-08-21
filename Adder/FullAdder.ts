import { Bit } from "./Bit"

type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : [];

// A full adder adds binary numbers and accounts for values carried in as well as out.
type FullAdder<
    A extends Bit,
    B extends Bit,
    Cin extends Bit, // Carry in
> = A extends 0
        // If A is 0
        ? B extends 0
            // B 0 Cin 0 -> 0 0
            // B 0 Cin 1 -> 0 1
            ? Cin extends 0
                ? [0, 0]
                : [0, 1]
            // B 1 Cin 0 -> 0 1
            // B 1 Cin 1 -> 1 0
            : Cin extends 0
                ? [0, 1]
                : [1, 0]
        // If A is 1
        : B extends 0
            // B 0 Cin 0 -> 0 1
            // B 0 Cin 1 -> 1 0
            ? Cin extends 0
                ? [0, 1]
                : [1, 0]
            // B 1 Cin 0 -> 1 0
            // B 1 Cin 1 -> 1 1
            : Cin extends 0
                ? [1, 0]
                : [1, 1]

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
            // if B is exhausted
            : RippleCarryAdder<A, [], Cin, Sum>
        : B extends [infer Y extends Bit, ...infer RestB extends Array<Bit>]
            // A is exhausted
            ? RippleCarryAdder<[], B, Cin, Sum>
            // Insert the final carry to the final sum if there's one
            : Cin extends 1
                ? [1, ...Sum]
                : Sum

// Why reverse?
// Because our Ripple Carry Adder works by adding the left most bit first.
// That's why we need to reverse our input so the right most bit becomes,
// the left most bit.
type A = Reverse<[1, 1, 0, 0]> // 12
type B = Reverse<[0, 1, 1, 1]> // 7
type Result = RippleCarryAdder<A, B> // Resolves to 19
