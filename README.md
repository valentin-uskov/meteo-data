The meteo-data app displays the temperature and wind direction for some cities for today in a table
and also a graph of the average temperature for the last 7 days. It is possible to filter by country and temperature value.

## Getting Started
First, clone the project. 

Then install the dependencies using the command:

```bash
yarn install
```

**In order for the application to work you need to add an environment variable**

```js
API_URL=your_api_url
```

When ```your_api_url``` is the url of your environment  

Example for local environment:

```
API_URL=http://localhost:3000
```

## Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build project 

```
yarn build
```

Directory with built project: ```.next``` 


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!