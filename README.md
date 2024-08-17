# Fun Fact Generator (v2.0)

Fun fact generator creates fun facts for those occassions where fun facts are required.

## Why?

A few years back, my development team was partaking in some company training. As an ice breaker, the instructor asked us all to share a fun fact. The only person in the room who had not worked together for the previous two years was the instructor. The team was very famaliar with each other, so the ice breaker was a bit unnecessary for us.

Have you ever met a software engineer? We're not the most socially graceful breed. We have fun facts. We just don't always like to share in social situations.

This app was born directly from this experience. After all, who wants the pressure of comming up with a fun fact on the spot?

## Features (some real, some imagined)

1. Generate a fun fact with the press of a button. Our fun facts are a combination of three categories of words: action verbs, adjectives, and objects. `I [action verb] [adjective] [objects].` It's a simple formula. After all, when you're making stuff up (lying), keep it simple.

2. Each new fact is added to a list. You don't have to accept the first fact. You can generate as many as you like. We'll display the list of fun facts for you to review should you decide a previous fact really captured your spirit.

3. You can up vote your facts. Like a fact? Think it was the perfect combination of verb, adjective, and object? Give that little heart a click and see the love grow.

4. If we've shared a fact before, you can see if it was a popular selection. Those little love clicks add up.

5. Save your facts for future use. Now, this will require you to create and account and validate your email, but we won't bug you beyond asking you to be a real person. Nothing against bots, but this is more of a `people` app.

6. Share your favorite facts with friends. I know, it's a bit presumptious that we just assume you have friends. Maybe you can use this newly found fun fact to find new ones? The world really is just one big opportunity. Send your fun fact into the world and see what love comes back to you.

## Issues and Bugs, Oh my!

Sadly, bugs and issues are a fun fact of software development. We would love to know if you encounter an issue while using our cool little application.

You can send us an email or lodge an issue with this code repository. We just ask you include a few things.

1. What browser you're using. Sometimes it matters. Sometimes it doesn't. But if we don't know your browser, we won't know if it matters.
1. What did you do right before you experienced the bug? We're not talking about deep thoughts or scratching your nose. What did you click on? What inputs did you enter? Was it related to a specific feature, such as liking a fact?
1. What were you expecting to happen? Sometimes expectations don't exactly align with reality. (Ask us about dating sometime.) It's good to know what you were expecting as we can validate those expecations or help you understand reality.

## New Features

Change can be good. If you have a great idea for a new feature, we'd like to know. Create a new `Issue` with `Feature Request` in the title. This lets us triage those ideas and respond faster.

## Running the app locally

We have several options for you to run this application locally. Clone the repo and run it on your own machine, clone the repo and build a local Docker image to run the app in a container, or download the Docker image from DockerHub and run the application in a container locally.

### Cloning the app

1. In the terminal enter this command:

    ```bash
    git clone git@github.com:ChadESmith42/fun-fact-generator-v2.git [local-repo-name]
    ```

    Replace `[local-repo-name]` with your own title for the app. Or remove that command and use the default repo name: `fun-fact-generator-v2`.

2. Install of the `npm` packages for the server:

    ```bash
    npm install
    ```

3. Install all of the `npm` packages for the client:

    ```bash
    cd client
    npm install
    ```

4. Run the server and app:

    You'll need two terminal windows for this. In the root of the project:

    ```bash
    npm run build && npm run start
    ```

    This builds and runs the server.

    ```bash
    cd client && ng serve -o
    ```
    This navigates to the `client` directory and stars the app. The `-o` command opens the application in the default browser. The default port for the client is `4200`. You can modify the port by adding `--port 1587`. Use whatever port you wish. The one caveat is that you cannot reuse existing ports. So port `3000` and port `5432` are being used by the server and database, respectively.


### Using a Docker Container

The application is setup to create a Dockerized server and database. As of this writing, the client is __NOT__ included in the Docker container.

1. Clone the app using Git as previously described above.
2. In the terminal, use this command to start a container for the server:

```bash
docker compose up
```

3. You can start the client by opening a terminal and entering the following command:

```bash
cd client && npm install && ng serve -o
```
This does three things. It navigates to the `client` folder. It installs the necessary `npm` packages. It starts the client application and opens the default browser to the application.

### Server-Side in Docker

You can also just run the server in a Docker container. This requires having PostgreSQL on your local machine, with the standard port of `5432` available.

You will also need to create a `dotenv` file with your PostgreSQL server credentials and connection parameters.

Once you have those prerequisites settled, open a terminal and enter the following command:

```bash
docker run -d -p 3000:3000 -p 5432:5432 --name my-fun-fact-container fun-fact-generator-v2
```

This creates a container called `my-fun-fact-container` with the server running inside. Port `3000` is exposed. Port `5432` is also mapped to your local port so the server can access the PostgreSQL instance on your machine. Remember, you can customize the ports and container name to meet your needs. This is just an example command.

You'll still need to run the client locally. The `client` does not have a `proxy.conf.json` file to connect with the backend. You can find instructions on how to create this file in the Angular Documentation: [Proxying to the Backend](https://angular.dev/tools/cli/serve#proxying-to-a-backend-server).