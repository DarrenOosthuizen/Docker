# EcoVillage API

This repository contains API for the EcoVillage project.

This is a branch for deployment to our server, made for docker and talks to our database.

## Requirements
- Python 3.9
- ~5GB space

## Initial setup
#### Easy setup
Run `setup.bat init --all` if you just need to set up and run.
   
#### Setup with custom database 
1. Run `setup.bat init`.
2. In `.env` file assign value to `DATABASE_URL` variable.
3. Run `setup.bat init --db`.

#### Update
If you already have an older version of the API, after `git pull` call `setup.bat update`.

## How to run
#### Development
Run `setup.bat run`.

#### Production 
1. Set `APP_ENV` value in `.env` file to `prod`.
2. Set `DATABASE_URL` variable.
3. Run `setup.bat run --prod`.

## Docker usage

1. Clone this git repo
2. Fill in the arguments in docker-compose.yml
> Change any '$' character to '$$', the dollar sign is the escape character in docker-compose files
3. Run `docker-composer up -d`

## API Documentation

Open the following url on your browser to view swagger documentation  
[http://127.0.0.1:5000/](http://127.0.0.1:5000/)
