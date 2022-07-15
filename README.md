# social-api

## Description
An API for a social media site. Users can share Thoughts, create Reactions to others' Thoughts, and curate a list of Friends from other users on the site. 
[Walkthrough Video](https://drive.google.com/file/d/1sGF57_H2-OgMItjkJvV_eb6EQ4wOP0S_/view)

## Technologies 
This API connects to a MongoDB database on local connection and launches via Express.js with Node.

## Installation
Besides the dependencies in the package.json, access to MongoDB is required. 
To install dependencies, after cloning, run 
```bash
npm i
```
A localhost connection is begun by running 
```bash 
npm start
```

## Issues
- Updating User's username does not currently change the username on previous Thoughts.
- Friends array accepts duplicate entries. 