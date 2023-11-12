# MakeMyInvoice

MakeMyInvoice is a standalone web app which takes an input of a [Toggl Track](https://track.toggl.com/) csv export, and converts it into a professional-looking invoice as a .docx file.

Customers for MakeMyInvoice would typically be self-employed workers who charge by the hour.

An example file is provided to download to test the functionality out!

## Live instance

[make-my-invoice.vercel.app](https://make-my-invoice.vercel.app)

## Setup for local deployment

1. Clone this repo: `git clone https://github.com/jleigh-100/make-my-invoice.git`.
2. In a terminal, in `make-my-invoice`'s root, run `sh setup.sh`, which will run the setup script. It will prompt you to enter a port number you would like to run the dev server on. The default is port 3000, and pressing enter with nothing entered when prompted will keep the project using port 3000. Entering any number will update the .env file (server/secrets/.env) with the specified port. It will also run `npm install` for you, installing all dependencies. **You should only run this file once** (unless you encounter an error running the script!).

## Running locally

1. Once the setup script has been run, or the next time you want to run the web app, just enter `npm start` in a termial which is open at the project's root.

## TODO
Dockerise
Decide if it needs an API - maybe it doesn't.
Decide if it needs a Database - again, DB seems superfluous.
