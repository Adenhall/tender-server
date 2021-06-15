# Tender Server

This is the server for tender app made by Quan

### Tech stack

- Express (Gud ol framework that is reliable)
- MongoDB (For awesome JSON documents)

### How to start making changes to the app

```
|--scripts
|   |
|   |--seeds.ts (You can add more methods of seeding to the data in here and then use it in `start.ts`)
|   |--start.ts (A single script to seed and run the application)
|
|
|--src
    |
    |--models (Holds the schema, model definitions of MongoDB collections)
    |
    |--routes (The logic for handling the requests from the Front-end is here. TO DO: Separate routing and controllers)
    |
    |--index.ts (This is the entry point for the whole application. You can configure the server, Express in here)

```
**Notes**

Whenever you create a service, update it in `swagger.json` for documentation. See https://inspector.swagger.io/builder to test run your API endpoint and then you can do `Create API Definition` to stick it in our `swagger.json`

### How to start locally
- Create an .env file in root from .env.template (You can skip this one if you don't want to setup a remote mongoDB)
- Do `yarn install`
- Do `yarn dev`