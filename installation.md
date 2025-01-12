# Please fork the project before starting

Click on the fork option to fork the project into your list of repositories.

# Installation

1. ```bash
   git clone https://github.com/yourusername/book-rating-app-assignment.git
   cd book-rating-app-assignment
   ```

**Install dependencies**

2. ```bash
   cd client
   npm i
   cd ..
   cd server
   npm i
   ```

3. **Create .env file in server/ folder**

   ```bash
   MONGO_TOKEN=YOUR_MONGO_CLUSTER_URL
   ```

   Sign up/Log in to the mongoDB atlas official website and create a cluster and obtain your URL

4. **To start the server**

```bash
 cd server
 npm start
```

**To start the frontend app**

```bash
cd client
npm start
```

**Happy coding and debugging**

 http://localhost:5000/books