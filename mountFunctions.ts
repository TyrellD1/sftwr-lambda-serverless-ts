#!/usr/bin/env ts-node

/** @format */

// import { readFileSync } from "fs";

import { mkdirSync, readFileSync, writeFileSync } from "fs";

// import { mkdirSync } from "fs";

/**
 * accepts --title --subtitle flags
 * --title will be name of folder
 * --subtitle will be for the sub folders (for dev exp purposes)
 * @returns This function returns an object that the flag is the key and the next argument is the value
 */
const formCommandLineFlagsArgs = () => {
  const flags = {};
  process.argv.forEach((val, index) => {
    if (val.includes("--")) {
      flags[val.replace("--", "")] = process.argv[index + 1];
    }
  });

  return flags as IClArgs;
};

interface IClArgs {
  title: string;
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

(async function run() {
  const handler = await readFileSync(
    "./src/functions/template/handler.ts",
    "utf8"
  );
  const indexFile = await readFileSync(
    "./src/functions/template/index.ts",
    "utf8"
  );
  const indexFileWithoutId = indexFile.replace("{id}", "");

  const clArgs: IClArgs = formCommandLineFlagsArgs();
  
  if (!clArgs.title)
    throw new Error("You must provide a title for your functions");

  await mkdirSync(`./src/functions/${clArgs.title}`);

  const subRoutes = [
    {
      name: `get-${clArgs.title}`,
      removeId: false,
    },
    {
      name: `put-${clArgs.title}`,
      removeId: false,
    },
    {
      name: `delete-${clArgs.title}`,
      removeId: false,
    },
    {
      name: `get-all-${clArgs.title}s`,
      removeId: true,
    },
  ];

  subRoutes.forEach(async (route) => {
    await mkdirSync(`./src/functions/${clArgs.title}/${route.name}`);
    await writeFileSync(
      `./src/functions/${clArgs.title}/${route.name}/handler.ts`,
      handler
    );
    await writeFileSync(
      `./src/functions/${clArgs.title}/${route.name}/index.ts`,
      route.removeId ? indexFileWithoutId : indexFile
    );
  });

  await writeFileSync(
    `./src/functions/${clArgs.title}/index.ts`,
    `import delete${capitalize(clArgs.title)} from "./delete-${
      clArgs.title
    }";
import getAll${capitalize(clArgs.title)}s from "./get-all-${
      clArgs.title
    }s";
import get${capitalize(clArgs.title)} from "./get-${clArgs.title}";
import put${capitalize(clArgs.title)} from "./put-${clArgs.title}";

export default {
  delete${capitalize(clArgs.title)},
  getAll${capitalize(clArgs.title)}s,
  get${capitalize(clArgs.title)},
  put${capitalize(clArgs.title)}
}
`
  );

  // console.log(res);
})();
