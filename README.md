# SARRAA  

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)  
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)  

## Overview  

**SARRAA** is a Master's thesis prototype project designed to demonstrate a novel AI-based web security approach.  
This system utilizes a trained machine learning model as a middleware to classify (accept or reject) web requests dynamically **before they are passed to the backend**.  
With the usage of iteratively trained AI, this project aims to enhance the traditional implementations of Web Application Firewalls (WAFs) and Intrusion Detection Systems (IDSs), mitigating common issues associated with dictionary-based filtering and blacklisting. 

Development Start Date: 22.03.2025

## Technologies Used  

| Technology  | Description  |
|------------|-------------|
| Vue.js     | Frontend framework  |
| Vite       | Build tool for fast development  |
| MySQL      | Database backend  |
| AI Model   | Used for request classification  |

## Project Setup  

Clone the repository and install dependencies:  
```sh
npm install
```
## Development Setup 

Compile and Hot-Reload for Development
```sh
npm run dev
```

Type-Check, Compile, and Minify for Production
```sh
npm run build
```

Lint with ESLint
```sh
npm run lint
```
