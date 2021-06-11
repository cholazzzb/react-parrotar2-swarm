import fs from "fs";

function Map(initialAgentsPosition, obstaclesPosition, targetsPosition) {
  this.initialAgentsPosition = initialAgentsPosition;
  this.obstaclesPosition = obstaclesPosition;
  this.targetsPosition = targetsPosition;

  this.history = {
    xPos: [],
    yPos: [],
    zPos: [],
    yaw: [],
  };

  this.initialAgentsPosition.forEach((agentInitPos, index) => {
    this.history.xPos.push({
      id: `Quad${index + 1}`,
      data: [],
    });
    this.history.yPos.push({
      id: `Quad${index + 1}`,
      data: [],
    });
    this.history.zPos.push({
      id: `Quad${index + 1}`,
      data: [],
    });
    this.history.yaw.push({
      id: `Quad${index + 1}`,
      data: [],
    });
  });
}

/**
 *
 * @param {Object} newData
 * @param {Number} quadIndex
 * format:
 * newDatas = {
 * time: Number,
 * xPos: Number,
 * yPos: Number,
 * zPos: Number,
 * yaw: Number // degree
 * }
 */
Map.prototype.addDataToHistory = function (newData, quadIndex) {
  this.history.xPos[quadIndex - 1].data.push({
    x: newData.time,
    y: newData.xPos,
  });
  this.history.yPos[quadIndex - 1].data.push({
    x: newData.time,
    y: newData.yPos,
  });
  this.history.zPos[quadIndex - 1].data.push({
    x: newData.time,
    y: newData.zPos,
  });
  this.history.yaw[quadIndex - 1].data.push({
    x: newData.time,
    y: newData.yaw,
  });
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
