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
      id: `Quad${index}`,
      data: [],
    });
    this.history.yPos.push({
      id: `Quad${index}`,
      data: [],
    });
    this.history.zPos.push({
      id: `Quad${index}`,
      data: [],
    });
    this.history.yaw.push({
      id: `Quad${index}`,
      data: [],
    });
  });
}

/**
 *
 * @param {Array of Object} newDatas
 * format:
 * newDatas = [{
  * time: Number,
  * xPos: Number,
  * yPos: Number,
  * zPos: Number,
  * yaw: Number // degree
 * }, {
  * time: Number,
  * xPos: Number,
  * yPos: Number,
  * zPos: Number,
  * yaw: Number // degree
 * }]
 */
Map.prototype.addDataToHistory = function (newDatas) {
  newDatas.forEach((newData, index) => {
    this.history.xPos[index].data.push({
      x: newData.time,
      y: newData.xPos,
    });
    this.history.yPos[index].data.push({
      x: newData.time,
      y: newData.yPos,
    });
    this.history.zPos[index].data.push({
      x: newData.time,
      y: newData.zPos,
    });
    this.history.yaw[index].data.push({
      x: newData.time,
      y: newData.yaw,
    });
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
