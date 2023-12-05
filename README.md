# passport_auth
Node express api that authenticates the user using passport and stores your authentication
status in a session SID as a cookie in the browser.

The user cannot access any routes in the application beforehand and is always redirected to /login route.
If the user has no account yet, they can click a link to the register page to create a new account.
The user is then automatically redirected into the /login page to login.

After logging in they are taken to the protected routes /.
While in the protected routes the user can't access the /login and /register pages.
Any attempts to do so results in the user being redirect back with an error message.

# demo

[demo2-passport-auth.webm](https://github.com/pgm-githumbi/passport_auth/assets/85244060/7b912b4f-58c5-4093-bdaa-f2356563513a)

# installation instructions
Clone this repo
```git clone <this-repo>```

Of course, you first need ```node.js``` installed. Install from nodejs.org

Cd into the project directory
```cd passport_auth```

Install the dependencies
```npm install```

Create your ```.env``` file in the project root directory and set your connection string
```CONNECTION_STRING='mongodb://localhost:YOUR_PORT/passport_auth'```

Set optional environment variables
```DEBUG=app*```
```PORT=3000```
```SESSION_SECRET="mysupersecretsesh"```

Run the project using the ```dev``` script like so.
```npm run dev```

Go to ```localhost:3000/``` on your browser.


