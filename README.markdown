# www.messa.cz

This is source code of my [personal website][1]. A have put it [on GitHub][2]
as an example of pretty simple web application made in Python using
Werkzeug and Genshi.

## Requirements

 - [Python][] 2.x
 - [Genshi][] – templating engine
 - [Werkzeug][] – library with request/response objects, HTTP utils, routing etc.
 - [CherryPy][] – optional; used only for production-quality WSGI HTTP server
    (not using entire CherryPy framework)

## Usage

    $ git clone git://github.com/messa/www.messa.cz.git && cd www.messa.cz
    $ ./messa_web.py --conf conf/web.conf [--port=<port number>] [--production]

## Misc

If you have any questions, don't hesitate to contact me :)

Some comments and/or documentation may be in Czech language; I'm sorry if you do
not understand Czech.

The application is starting it's own HTTP server (from Python standard library
or CherryPyWSGIServer), but thanks to WSGI it can be easily modified to use
FastCGI, CGI or anything other.


[1]: http://www.messa.cz/
[2]: http://github.com/messa/www.messa.cz
[Genshi]: http://genshi.edgewall.org/
[Werkzeug]: http://werkzeug.pocoo.org/
[CherryPy]: http://www.cherrypy.org/
[Python]: http://www.python.org/

