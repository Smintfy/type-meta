type Bit = 0 | 1

// Flip a bit, if bit is 0 return 1 otherwise 0
type Flip<B extends Bit> = B extends 0 ? 1 : 0

export { Bit, Flip }