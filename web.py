#!/usr/bin/env python3

import flask
from flask import render_template, request


app = flask.Flask(__name__)


@app.route('/')
def index():
    al = request.headers.get('Accept-Language', '')
    if 'cs' in al.lower():
        return flask.redirect('/cs/')
    return flask.redirect('/en/')


@app.route('/en/')
def index_en():
    return render_template('index.html', en=True)


@app.route('/cs/')
def index_cs():
    return render_template('index.html', cs=True)


def main():
    app.run(debug=True, use_reloader=True, host='0.0.0.0')


if __name__ == '__main__':
    main()
