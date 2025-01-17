# CrossPlatformTrainer Application
ONLINE CAPSTONE PROJECT (CS_467)
Dennis Lam, Melanie Archer, Soo Young Lee

## Table of Contents
- [How to Install and Run](#how-to-install-and-run)
- [Install the Fitness Trainer on Your Computer](#install-the-fitness-trainer-on-your-computer)

## How to Install and Run
You can use the Fitness Trainer online.

### Connect to OSU VPN
Go to:

[http://flip3.engr.oregonstate.edu:65137/](http://flip3.engr.oregonstate.edu:65137/)

in your browser.

### Login as a Current User
- **Email:** `osustudent@email.com`
- **Password:** _(No password required)_

### Sign Up for a New Account
To create a new account, visit:

[http://flip3.engr.oregonstate.edu:65137/signup](http://flip3.engr.oregonstate.edu:65137/signup)

## Install the Fitness Trainer on Your Computer

If you'd like to install the Fitness Trainer on your own computer, follow these steps:

### 1. Check for Node.js and NPM Installation
In a console or terminal window, type:

```
node -v
```

If you have Node.js installed, you will see a version number on the next line. You will need at least Node.js version 18.14.0.

Now, type:

```
npm -v
```

If you have NPM installed, you will see a version number on the next line. You will need at least NPM version 9.3.1.

If you see error messages, it probably means you have to install this software. You can do this by downloading [Node.js](https://nodejs.org/).

### 2. Clone or Download the Fitness Trainer Application Code
Clone the repository:

```
git clone https://github.com/dennislam4/CrossPlatformTrainer
```

Or download it from [GitHub](https://github.com/dennislam4/CrossPlatformTrainer).

### 3. Navigate to the Project Directory
In a console window on your computer, go to where you have downloaded or cloned the Fitness Trainer code.
Go to the CrossPlatformTrainer folder:

```
cd CrossPlatformTrainer
```

### 4. Navigate to the Backend Directory
Now, go to the backend directory:

```
cd ./backend
```

### 5. Install Backend Dependencies
Type:

```
npm install
```

### 6. Set Up Environment Variables
After the process ends, stay in the backend directory. Rename the `env.example` file to `.env`:

```shell
mv env.example .env
```

### 6. Set Up Environment Variables
After the process ends, stay in the backend directory. Rename the `env.example` file to `.env`:

```shell
mv env.example .env
```
Edit the `.env` file to replace `<USERNAME>` and `<PASSWORD>` with the values provided to you in a separate message (or installation document).

### 7. Start the Backend Server
Stay in the backend directory. In the console window, type:

```
npm start
```

You should see:

```
Successfully connected to MongoDB fitness_trainer collection using Mongoose
```

To stop this database server, press `CTRL+C` in the console from the backend directory.

### 8. Install Frontend Dependencies
Open a new, separate console window. Go to the frontend directory. Type:

```
cd ../frontend
npm install
```

### 9. Start the Frontend Server
After this process ends, in this same console window, type:

```shell
npm start
```

You should see:

```
Compiled successfully!
```

Your web browser will open and display [http://localhost:3000](http://localhost:3000).

Use the login provided above to sign in.

To stop this front-end server, press `CTRL+C` in the console from the frontend directory.




