#!/bin/bash

function test (){
    # This will create a '$1.log' file
    echo "========= Testing $1 =========="
    ./run.sh $1 > /dev/null
    python finalOutputStrip.py $1.log > $1.strip
    # One of my tests cases were not alphabetized
    # Special diff can handle this
    #diff $1.strip $1.test
    python specialDiff.py $1.strip $1.test
    rm $1.strip
}

# Run Provided Tests
test SimpleTopo
test SingleLoopTopo
test SimpleNegativeCycle
test ComplexTopo

# Run Peer Tests
test SingleNode
test OddLength
test Wheels
test SmallInfinite
test SimpleComplexTopo
test MiddleCycle
test SemiCyclicTriangle
test FullCyclicTriangle
test Biohazard
test TriangleWithLine
test StraightLine
