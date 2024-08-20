type Bit = 0 | 1

// Flip a bit, if bit is 0 return 1 otherwise 0
type Flip<B extends Bit> = B extends 0 ? 1 : 0

// Add two bit
// < The two bit that's going to be added
// > A carry and A result as operation might cause overflow to result bit
type HalfAdder<
    A extends Bit,
    B extends Bit,
    C extends Bit = 0
> = A extends 0
        ? B extends 0
            ? [C, 0]
            : [C, 1]
        : B extends 0
            ? [C, 1]
            : [Flip<C>, 0] // if A and B is 1 then the overflow from result carry out.

type ResolveHalfAdder = HalfAdder<1, 1> // Resolve to 1 0