# Chatt.io - The Discord Clone

Chatt.io is a Discord clone project designed for educational purposes, aiming to provide a hands-on experience in developing a real-time chat application using modern web technologies.

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Demo](#demo)
-   [Installation](#installation)

## Introduction

Chatt.io mirrors the functionality of the well-known chat platform Discord. Leveraging technologies such as React 18.2, Next.js 14, and Tailwind CSS, it incorporates various tools including:

-   React 18.2
-   Next.js 14
-   Pages router for socket.io connections, API routes, and server actions
-   Prisma with SQL database
-   React Query for loading messages
-   Clerk for authentication
-   Uploadthing for uploading images and PDF files
-   Zustand for modal store
-   Zod for form authentication
-   Socket.io for WebSocket connections
-   Tailwind CSS for styling
-   LiveKit for audio/video chats
-   TypeScript for type safety

This project serves as a practical guide for building a real-time chat application similar to Discord using contemporary web technologies.

## Features

-   Real-time chat functionality with WebSockets
-   User authentication and authorization via Clerk
-   Channel and server creation and management
-   Emoji support
-   Image and PDF uploads with Uploadthing
-   Video and audio communications using LiveKit

## Demo

Explore the live demo of the project [here](https://discord-clone-production-0544.up.railway.app/).

## Installation

To install and run Chatt.io locally, follow these steps:

1. Clone this repository to your local machine:

    ```
    git clone https://github.com/Veskata98/discord-clone
    ```

2. Navigate to the project directory:

    ```
    cd chatt-io
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Set up environment variables:

    ```
    cp .env.example .env.local
    ```

    Populate `.env.local` with your relevant environment variables.

5. Run the development server:

    ```
    npm run dev
    ```

6. Visit `http://localhost:3000` in your browser to view the application.
