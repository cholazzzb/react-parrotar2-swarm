import fs from "fs";

function Map(initialAgentsPosition, obstaclesPosition, targetsPosition) {
  this.initialAgentsPosition = initialAgentsPosition;
  this.obstaclesPosition = obstaclesPosition;
  this.targetsPosition = targetsPosition;

  // in Quad Reference Frame
  this.history = {
    xPos: [],
    xVel: [],
    yPos: [],
    yVel: [],
    zPos: [],
    yaw: [],
  };

  this.currentPositions = [[], []];

  this.initialAgentsPosition.forEach((agentInitPos, index) => {
    let newData = {
      id: `Quad${index + 1}`,
      data: [],
    };
    this.history.xPos.push(newData);
    this.history.xVel.push(newData);
    this.history.yPos.push(newData);
    this.history.yVel.push(newData);
    this.history.zPos.push(newData);
    this.history.yaw.push(newData);
  });
}

/**
 *
 * @param {Object} newData
 * @param {Number} quadIndex
 * format:
 * newData = {
 * time: Number, // second
 * xVel: Number, // meter
 * yVel: Number,
 * }
 */
Map.prototype.addNavDataToHistory = function (newData, quadIndex) {
  this.history.xVel[quadIndex].data.push({
    x: newData.time,
    y: newData.xVel + this.initialAgentsPosition[quadIndex][0],
  });
  this.history.yVel[quadIndex].data.push({
    x: newData.time,
    y: newData.yVel + this.initialAgentsPosition[quadIndex][1],
  });
};

/**
 *
 * @param {Object} newData
 * @param {Number} quadIndex
 * format:
 * newData = {
 * time: Number, // second
 * xPos: Number, // meter
 * yPos: Number,
 * zPos: Number,
 * yaw: Number // degree
 * }
 */
Map.prototype.addControlDataToHistory = function (newData, quadIndex) {
  this.history.xPos[quadIndex].data.push({
    x: newData.time,
    y: newData.xPos,
  });
  this.history.yPos[quadIndex].data.push({
    x: newData.time,
    y: newData.yPos,
  });
  this.history.zPos[quadIndex].data.push({
    x: newData.time,
    y: newData.zPos,
  });
  this.history.yaw[quadIndex].data.push({
    x: newData.time,
    y: newData.yaw,
  });
  this.currentPositions[quadIndex] = [newData.xPos, newData.yPos, newData.zPos];
};

Map.prototype.saveDataHistory = function (folderName, fileName) {
  fs.writeFileSync(
    `${folderName}/${fileName}.js`,
    `const ${fileName} = ` +
      JSON.stringify(this.history) +
      `; export default ${fileName}`,
    "utf-8"
  );
};

export default Map;
