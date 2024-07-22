# CrossPlatformTrainer
ONLINE CAPSTONE PROJECT (CS_467)
https://www.figma.com/design/0O5SsDkXUKUQl3B88kLCfU/Fitness-App-(CS-467)?node-id=0-1&t=aCWNgpRnwcz2uABE-1

## How to install and run
1. Clone or download this repository
2. In a console window, go to the `backend` directory, and type:
```shell
npm install
```
3. Stay in the `backend` directory, and rename the `env.example` file to `.env`
```shell
mv env.example .env
```
4. Edit the `.env` file to replace `<USERNAME>` and `<PASSWORD>` with the values provided to you in a separate message.

6. In this console window, type:
```shell
npm start
```
You should see `Successfully connected to MongoDB fitness_trainer collection using Mongoose` in the console window.

**To stop this database server,** press `CTRL-C` in the console from the `backend` directory.

6. Now, in a **separate** console window, go to the `frontend` directory, and type:
```shell
npm install
```
7. In this console window, type:
```shell
npm start
```
You should see `Compiled successfully!` in the console window, and `http://localhost:3000` open in the browser.

**To stop this front end server,** press `CTRL-C` in the console from the `frontend` directory.



