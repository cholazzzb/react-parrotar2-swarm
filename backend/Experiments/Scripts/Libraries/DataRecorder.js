import fs from "fs";

function DataRecorder() {
    this.data = {
        time : [],
        xPos : [],
        yPos : [],
        zPos : []
    }
}

DataRecorder.prototype.addData = function ([newTime, newX, newY, newZ]) {
  this.data.time.push(newTime);
  this.data.xPos.push(newX);
  this.data.yPos.push(newY);
  this.data.zPos.push(newZ);
};

DataRecorder.prototype.saveDataWE = function(extension, folderName, fileName){
  let content;
  switch (extension) {
    case "js":
      content = `const ${fileName} = ${JSON.stringify(
        this.data
      )}; export default ${fileName}`;
      break;
    case "py":
      content = `${fileName} = ${JSON.stringify(this.data)}`;
      break;

    default:
      break;
  }
  fs.writeFileSync(`${folderName}/${fileName}.${extension}`, content, "utf-8");
}

DataRecorder.prototype.saveData = function (folderName, fileName) {
  fs.writeFileSync(
    `${folderName}/${fileName}.js`,
    `const ${fileName} = ` +
      JSON.stringify(this.history) +
      `; export default ${fileName}`,
    "utf-8"
  );
};

export default DataRecorder;
