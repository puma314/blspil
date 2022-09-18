# Implementing pairing for BLS12-381 in PIL

An elliptic curve pairing is a bilinear function that takes in 2 elliptic curve points and outputs a scalar. Pairings are important cryptographic primitives and used in verifying zkSNARK proofs (used for privacy and scaling, for example in Tornado Cash and zkEVM) and also verifying BLS signatures (used by the Eth2 PoS validators). We implemented pairing for the BLS12-381 curve in PIL, which allows us to verify BLS signatures within a STARK. This is useful for succinctly verifying BLS signatures on-chain and within zkEVMs.

## Directory Structure

- `pil/` contains the STARK code to generate the circuit specification
- `src/` contains the code to perform witness generation and prover generation
- `test/` has tests for each component



https://user-images.githubusercontent.com/5422468/190893306-3049ffe6-37b7-401c-9f2d-0086d2b407cf.mov

