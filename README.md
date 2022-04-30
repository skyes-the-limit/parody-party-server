# Welcome to Parody Party
Your go-to portal for popular parodies of songs

## Course Credits
This project was created as the final project for CS 5610 Web Development with Jose Annunziato in the Spring 2022 semester.

## Running Locally
Before attempting to run locally, be sure to update CORS policies set in `server.js` to match your specified port for the frontend:
```app.use(cors(
  {
    credentials: true,
    // origin: 'http://localhost:3000'
    origin: 'https://parody-party.netlify.app'
  }
))
```

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode at [http://localhost:4000](http://localhost:4000).\
ddle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm run lint`

Lints the source code to match `.eslintrc` configuations.

