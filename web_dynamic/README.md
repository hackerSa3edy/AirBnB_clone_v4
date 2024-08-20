# HBnB Project

This project is a simple web dynamic application. It includes a server in Python and a front-end in HTML, CSS, and JavaScript.

## Server

The server is implemented in Python using Flask. It serves the static files and provides dynamic content through API endpoints. The server files are:

- `0-hbnb.py`
- `1-hbnb.py`
- `2-hbnb.py`
- `3-hbnb.py`
- `4-hbnb.py`
- `100-hbnb.py`
- `101-hbnb.py`

## Front-end

The front-end is implemented in HTML, CSS, and JavaScript. It uses jQuery for DOM manipulation and AJAX calls. The front-end files are:

- HTML: 0-hbnb.html, 1-hbnb.html, 2-hbnb.html, 3-hbnb.html, 4-hbnb.html, 100-hbnb.html, 101-hbnb.html
- JavaScript: 1-hbnb.js, 2-hbnb.js, 3-hbnb.js, 4-hbnb.js, 100-hbnb.js, 101-hbnb.js

## Features

The application displays a list of places. Users can select some amenities and states/cities and click on "Search" button to update the list of places.

The status of the API is displayed in the header: a circle is green if the API is running and grey otherwise.

## How to run

To run the server, use the following command:

```sh
python3 -m web_dynamic.<filename>
```

Replace `<filename>` with the name of the server file you want to run (without the `.py` extension).

Then, open your web browser and navigate to `http://0.0.0.0:5000/`.

## Note

This project is for educational purposes.
