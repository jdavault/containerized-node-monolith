# Interview Prep Sandbox

## Overview

This is a node.js and react project bootsrapped with [`create-react-app`] and node express

This repository contains a Node app that lists the names of users, which can be fetched from an API call to a NodeJs API route (/api/users). This fetched data is used on a user page (/users). The data for the users is from mocked data. A user can click on another user and go to their profile page (/users/:id). On the profile page you will see user details. The profile information also comes from an API endpoint (/api/user/:id) served from the NextJS app. On a user's profile page (/user/:id), you can click on one of the friends to be routed to that friend's profile page.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running](#Running)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following:

- NodeJS (v18 or later)
- npm (v8 or later)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/jdavault/containerized-node-monolith
   cd couch-user-directory
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

## Running

1. Start the services locally:

   ```sh
   npm run dev
   ```

2. The Users API will be accessible at `http://localhost:3001/api/users`
3. The User API will be accessible at `http://localhost:3001/api/users/id`
4. The Users Page will be accessible at `http://localhost:3001/users`
5. The User Page will be accessible at `http://localhost:3001/users/id`
