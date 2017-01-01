#!/usr/bin/env python3

import flask
from flask import render_template, request
from pathlib import Path


app = flask.Flask(__name__)


@app.route('/')
def index():
    '''
    Redirect to /en/ or /cs/ based on reported browser language preferences.
    '''
    # This is too simle, but I believe it's OK.
    # Of course more perfect solution would be to parse the header.
    al = request.headers.get('Accept-Language', '')
    if 'cs' in al.lower():
        return flask.redirect('/cs/')
    return flask.redirect('/en/')


@app.route('/en/')
def index_en():
    # Both language versions are stored in a single template, differentiated
    # only using the variables 'en' and 'cs' (True/False).
    return render_template('index.html', en=True)


@app.route('/cs/')
def index_cs():
    return render_template('index.html', cs=True)


@app.route('/<string:filename>')
def favicon_file(filename):
    '''
    All the favicon-related stuff is expected to be served from web root.
    This route serves it (from real directory static/favicon).
    '''
    return flask.send_from_directory(
        str(Path(app.root_path) / 'static/favicon'),
        filename)


def main():
    app.run(debug=True, use_reloader=True, host='0.0.0.0')
    # but it might be better to use "flask run"


if __name__ == '__main__':
    main()
