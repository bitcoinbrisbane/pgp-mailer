from flask import Flask
from app import app
import os

from dotenv import load_dotenv
load_dotenv()


if __name__ == '__main__':
    print('Starting')

    PORT = os.getenv('PORT')
    app.run('127.0.0.1', port=PORT, debug=False)

