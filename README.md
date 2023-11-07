# MakeMyInvoice

MakeMyInvoice is a standalone web app which takes an input of a [Toggl Track](https://track.toggl.com/) csv export, and converts it into a professional-looking invoice as a .docx file.

Customers for MakeMyInvoice would typically be self-employed workers who charge by the hour.

An example file is provided to download to test the functionality out!

## To run locally
1. Clone this repo: `git clone https://github.com/jleigh-100/make-my-invoice.git`.
2. In a terminal, in `make-my-invoice`'s root, run `npm i` to install all dependencies, then run `npm start`.
  - By default, it runs on port 3000.
    - You can change this by either updating [config.json](./server/config.json), or creating a .env file and adding a line in the server's secrets folder (this .env file should be located in make-my-invoice/server/secrets/.env, and simply consist of one line: `PORT=[your preferred port]`).

## TODO
Dockerise
Decide if it needs an API - maybe it doesn't.
Decide if it needs a Database - again, DB seems superfluous.
