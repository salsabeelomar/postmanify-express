# postmanify-express

A simple and lightweight package for automating the generation of Postman collections directly from API source code .🚀

## Table of contents

- [Installation](#Installation)
- [Features](#Features)
- [Quick Start](#Quick-Start)
- [License](#license)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 18 or higher is required.

Installation is done using the :

```bash
npm i postmanify-express
```

## 🚀 Usage

Generate a Postman collection from your Express.js routes file using:

```bash
npx postmanify-express generate --input <your-express-routes-file.js>
npx postmanify-express generate --input  <your-express-routes-file.js> --output <your-api-collection.json>
npx postmanify-express generate --input <your-express-routes-file.js> --exclude [<route>]

```

### Command Overview

| Command                | Description                                                                                                                                                   | Example                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `--input <file>`       | Path to the file containing your Express.js route definitions.The file must export an Express router or app instance.                                         | `npx postmanify-express generate --input examples/demo-app.js`                        |
| `--output <file>`      | Path where the generated Postman collection will be saved. If not provided, the collection will be saved as postman-collection.json in the current directory. | ` npx postmanify-express generate --input examples/demo-app.js --output postman.json` |
| `--exclude [<route>] ` | Route paths to exclude from the generated Postman collection. This option can be used multiple times to exclude multiple routes.                              | `npx postmanify-express generate --input examples/demo-app.js --exclude [/home]`      |
| `--no auth`            | Skips the detection of authentication headers when generating the Postman collection.                                                                         | `npx postmanify-express generate --input examples/demo-app.js --no-auth`              |

## Features

- Automatically Postman Collection Generation
- Works with Express Routers
- Focus on high performance
- Supports RESTful APIs
- Lightweight & Fast
- Open Source & Developer-Friendly

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit)
