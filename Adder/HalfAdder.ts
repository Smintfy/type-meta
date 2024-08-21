import { Bit, Flip } from "./Bit"

// Add two bit
// < The two bit that's going to be added
// > A carry and A result as operation might cause overflow to result bit
type HalfAdder<
    A extends Bit,
    B extends Bit,
    Cout extends Bit = 0 // Cout is carry out.
> = A extends 0
        ? B extends 0
            ? [Cout, 0]
            : [Cout, 1]
        : B extends 0
            ? [Cout, 1]
            : [Flip<Cout>, 0] // if A and B is 1 then the overflow from result carry out.
        
type ResolveHalfAdder = HalfAdder<1, 1> // Resolve to 1 0