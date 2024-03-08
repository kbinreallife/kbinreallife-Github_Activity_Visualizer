# kbinreallife-Github_Activity_Visualizer
A Github Activity Visualization Project

# github_visualization_container

A Github Activity Visualization Project

## Using this repository

- Clone the repo

```
git clone https://github.com/your-username/project-name.git
cd project-name
```

- Set up environment variables

Create a .env file in the root of your project directory and add your configuration variables. You can refer to the current `.env` file for guidance. The `.env` file has been added to .gitignore so it will not push your credentials to github.

- Make the start.sh file executeable.

```
chmod +x start.sh
```

- Start the project

Run the start.sh file to install all dependencies and fetch/format data

```
./start.sh
```

Open the application

- Open your browser and navigate to `http://localhost:3000`

## Manual Commands:

If the above instructions give you trouble, or if you would prefer to navigate the project manually for any reason follow these instructions after updating your .env variables.

install dependencies
```
npm install
npm install node-fetch
npm install express
npm install moment
npm install dotenv
npm install -g http-server
```

Fetch the data from the Github org via Github's REST API.

```
node scripts/fetch_data.js
```

Make all data searchable and write to local storage.

```
node format_data.js
```

Project the query to `http://localhost:3000`:

```
node src/js/main.js
```

Open the application

- Open your browser and navigate to `http://localhost:3000`
