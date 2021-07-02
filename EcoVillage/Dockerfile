# require python
FROM python:3.9-buster

# arguments
ARG DATABASE_URL
ARG SECRET_KEY
ARG FLASK_APP
ARG APP_ENV

# environmental variables
ENV FLASK_APP=${FLASK_APP}
ENV SECRET_KEY=${SECRET_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV APP_ENV=${APP_ENV}

# uncomment this if you want to make sure the URL is correct on building the image
RUN echo ${DATABASE_URL}

# working directory
WORKDIR .

# copy source code into image
COPY . .

# install required libraries
RUN pip install -r requirements.txt

# initialize models
RUN flask init models

# initialize databases
RUN flask db init
RUN flask db migrate
RUN flask db upgrade

# expose port 5000
EXPOSE 5000/tcp
EXPOSE 5000/udp

# run
CMD ["waitress-serve", "--port=5000", "--url-scheme=https", "manager:app"]
