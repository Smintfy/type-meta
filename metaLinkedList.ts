// The next value of a node could be an array type or a null
type Next = Array<any> | null

// Node holds a value and the next node
type NT<V extends number, N extends Next> = [V, N]

// Insert value and append the previous node as the next node
type Insert<
    V extends number,
    LL extends Next
> = NT<V, LL>

// Append value to end of list
type Append<
    V extends number,
    LL extends NT<number, Next>
> = LL extends NT<infer I, infer N>
    ? N extends null
        ? NT<I, NT<V, null>>
        : N extends NT<number, Next>
            ? NT<I, Append<V, N>>
            : never
    : never

type Evaluate<LL> = 
    LL extends NT<infer I, infer Next>
        ? [I, Evaluate<Next>]
        : LL

type LL = NT<1, null>;
type LLI2 = Insert<2, LL>
type LLI3 = Insert<3, LLI2>
type LLA4 = Append<4, LLI3>
type Resolve = Evaluate<LLA4> // Resolves to [3, [2, [1, [4, null]]]]