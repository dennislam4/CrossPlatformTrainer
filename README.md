# CrossPlatformTrainer Application
ONLINE CAPSTONE PROJECT (CS_467)
Dennis Lam, Melanie Archer, Soo Young Lee

## How to install and run
You can use the Fitness Trainer online.

## Connect your OSU VPN
go to http://flip3.engr.oregonstate.edu:65137/ in your browser.


If you want to login as a current user, use these credentials:

Email: osustudent@email.com
No password

If you want to sign up to create a new account, go to http://flip3.engr.oregonstate.edu:65137/signup in your browser.



## Alternatively, here is how you can install the Fitness Trainer to your own computer.

1. Check whether you have NodeJS and NPM installed. In a console or terminal window, type:

node -v

If you have NodeJS installed, you will see a version number on the next line. You will need at least Node version 18.14.0.

Now, type:

npm -v

If you have NPM installed, you will see a version number on the next line. You will need at least NPM version 9.3.1.

If you see error messages, it probably means you have to install this software. You can do this with a download from NodeJS.


2. Clone or download the Fitness Trainer application code:

https://github.com/dennislam4/CrossPlatformTrainer

3. In a console window on your computer, go to where you have downloaded or cloned the Fitness Trainer code.
Go to the CrossPlatformTrainer folder.
cd CrossPlatformTrainer
4. Now, go to the backend directory.
cd ./backend
5. Type:

npm install

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

6. **Now**, in a **separate** console window, go to the `frontend` directory, and type:
```shell
npm install
```
7. In this console window, type:
```shell
npm start
```
You should see `Compiled successfully!` in the console window, and `http://localhost:3000` open in the browser.

**To stop this front end server,** press `CTRL-C` in the console from the `frontend` directory.




