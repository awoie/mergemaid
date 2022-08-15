# MergeMaid

Simple script that merges mermaid sequence diagrams. 

## Usage

Include other mermaid sequence diagrams in your .mmd files like this:

```
sequenceDiagram
    actor Alice
    actor Bob

    %% import ./test/a.mmd
    
    Alice->>Bob: Hi Bob
    Bob->>Alice: Hi Alice
```

Then run:

```
node index.js ./test/main.mmd ./output/merged.mmd
```

## Limitations
- only supports .mmd files in the same directory
- only supports `SequenceDiagram` diagram type