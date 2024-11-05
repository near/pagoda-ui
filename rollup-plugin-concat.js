const fs = require('fs');
const path = require('path');

function concat(options = {}) {
  const outputPath = path.resolve(process.cwd(), options.outputFile);

  return {
    name: 'concat',

    writeBundle() {
      let code = '';

      for (const file of options.files) {
        const filePath = path.resolve(process.cwd(), file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          fs.unlinkSync(filePath);
          code += `${content}\n`;
        }
      }

      writeFileWithDirs(outputPath, code);
    },
  };
}

function writeFileWithDirs(outputPath, code) {
  const dir = path.dirname(outputPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, code, 'utf8');
}

export default concat;
