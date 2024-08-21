import { Bit } from "./Bit"

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

export { FullAdder }