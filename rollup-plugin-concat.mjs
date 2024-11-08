import fs from 'fs';
import path from 'path';

function concat(options = {}) {
  const outputPath = path.resolve(process.cwd(), options.outputFile);

  return {
    name: 'concat',

    writeBundle() {
      let code = '';
      let exit = false;

      for (const file of options.files) {
        const filePath = path.resolve(process.cwd(), file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          fs.unlinkSync(filePath);
          code += `${content}\n`;
        } else {
          exit = true;
        }
      }

      if (exit) return;

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
