#!/bin/bash

# Change directory to the project root
cd "$(dirname "$0")"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found. Please create a .env file and add your environment variables."
    exit 1
fi

# Install npm packages
echo "Installing npm packages..."
npm install node-fetch express moment dotenv

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to install npm packages. Please check your internet connection and try again."
    exit 1
fi

# Install http-server globally
echo "Installing http-server globally..."
npm install -g http-server

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to install http-server globally. Please check your internet connection and try again."
    exit 1
fi

# Run the script to fetch data
echo "Running fetch_data.js script..."
node scripts/fetch_data.js

# Check if fetch_data.js completed successfully
if [ $? -ne 0 ]; then
    echo "Error: Failed to run fetch_data.js script."
    exit 1
fi

# Run the script to format data
echo "Running format_data.js script..."
node scripts/format_data.js

# Check if format_data.js completed successfully
if [ $? -ne 0 ]; then
    echo "Error: Failed to run format_data.js script."
    exit 1
fi

echo "Initialization completed successfully."
