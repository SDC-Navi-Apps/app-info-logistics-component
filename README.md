# App Information and Logistics Component

> This component will display all the relevant app information and logistics. It will also allow users to add the current app to their wishlist and ability to install app.

## Related Projects

  - https://github.com/FEC-Group-Link/app-preview-info-carousel
  - https://github.com/FEC-Group-Link/review-component
  - https://github.com/FEC-Group-Link/similar-component
  - https://github.com/FEC-Group-Link/app-info-logistics-component

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
```sh
npm run start (will start up server)
npm run bulid (will start of webpack to compile your react files into a bundle.js)
npm run db:setup (will seed your database with 100 apps)
```
## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install

```
## API Documentation

### GET

Send requests to localhost:3004/apps/:appid

Will pull the app with the corresponding 'id' using.

### POST

Send request to localhost:3004/api/create with a raw JSON body.

Will create a document.

### PUT

Send request to localhost:3004/api/update/:appid with a raw JSON body.

Will update the document with corresponding 'id'

### DELETE

Send request to localhost:3004/api/delete/:appid

Will delete document with corresponding 'id'