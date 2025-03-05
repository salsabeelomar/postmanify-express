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
npx postmanify-express --input <your-express-routes-file.js>
npx postmanify-express --input <your-express-routes-file.js> --exclude [<route>]

```

Command Overview

#### Option         Description
---
--input <file>      (Required) Path to your Express.js routes file
---
--exclude [<route>] (Optional) Route paths to exclude from collection (can be specified multiple times)

## Features

- Automatically Postman Collection Generation
- Works with Express Routers
- Focus on high performance
- Supports RESTful APIs
- Lightweight & Fast
- Open Source & Developer-Friendly

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit)
