
# Stackoverflow crawler

Recursively crawled https://stackoverflow.com/questions using Node.js based crawler, harvested all questions on Stack Overflow and storeed them in a database.

Maintained a concurrency of 5 requests at all times by using http-requests and limiting the listeners to 5.

The default **HTTP/HTTPS** Agent only uses a maximum of 5 sockets.

* **crawldata.js** file is used to crawl the URL.

* **createcsvfile** is to create the csv file.

* **data.csv** stores the data in csv format.

* **dbconnect.js** is for database connectivity.

* **dbwrite.js** is to write the data in the database.

* **writecsv.js** is to write the data in the csv file.

## Deployment

To clone this project, run

```bash
  git clone ssh://git@github.com:nicolausmaximus/Web-crawler.git
```

To install all the dependencies
```bash
  npm i
```

To run this project

```bash
  node src/app.js
```


## Screenshots

![image](https://user-images.githubusercontent.com/63350417/148443743-acffc1d2-a57d-4234-9e9b-4b1f584baba5.png)

![image](https://user-images.githubusercontent.com/63350417/148444315-437adc0b-0e0d-42fa-b348-4c5ff1a5ecb8.png)

![image](https://user-images.githubusercontent.com/63350417/148444558-81d602ad-6286-4fdd-ac48-34c5a881d1ac.png)

