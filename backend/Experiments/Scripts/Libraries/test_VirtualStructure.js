import VirtualStructure from "./VirtualStructure.js";
const VS = new VirtualStructure();

// Test 1
VS.calculateVSPoint();

// Test 2
VS.calculateNewFRPPoint([10, 1, 0]);

// Test 3
VS.setCurrentVSPoints();

// Test 4
VS.calculateNewVSPoint();
