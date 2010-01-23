#!/usr/bin/env python
# -*- coding: utf-8 -*-

import genshi.template
import optparse
import os
import traceback
import werkzeug

import util.various
import views


class Suite:

    def __init__(self, web, request, urlMapAdapter):
        (self.web, self.request, self.urlMapAdapter) = (web, request, urlMapAdapter)

    def url_for(self, target, **args):
        return self.urlMapAdapter.build(target, args)


class MessaWeb:

    def __init__(self, configFilePath, production):
        self.production = production
        self.configuration = util.various.parse_configuration_file(configFilePath)
        self.analyticsCode = self.configuration["analytics.code"]
        self.urlMap = views.get_url_map()
        self.baseDir = os.path.dirname(os.path.abspath(__file__))
        templateDir = os.path.join(self.baseDir, "templates")
        self.staticDir = os.path.join(self.baseDir, "static")
        assert os.path.isdir(templateDir)
        assert os.path.isdir(self.staticDir)
        self.templateLoader = genshi.template.TemplateLoader([templateDir], auto_reload=True)
        app = werkzeug.Request.application(self.dispatch)
        self.app = werkzeug.SharedDataMiddleware(app, {"/static": self.staticDir})

    def dispatch(self, request):
        try:
            urlMapAdapter = self.urlMap.bind_to_environ(request.environ)
            try:
                (handler, args) = urlMapAdapter.match()
            except werkzeug.routing.HTTPException, e:
                return e
            suite = Suite(self, request, urlMapAdapter)
            response = handler(suite, **args)
            if not isinstance(response, werkzeug.BaseResponse):
                response = response.render(suite)
            assert isinstance(response, werkzeug.BaseResponse)
            return response
        except:
            traceback.print_exc()
            return werkzeug.Response("Server Error", status=500)

    def __call__(self, environ, start_response):
        return self.app(environ, start_response)


if __name__ == "__main__":
    op = optparse.OptionParser()
    op.add_option("--config", dest="configFilePath")
    op.add_option("--port", default=4000)
    op.add_option("--production", default=False, action="store_true")
    options, args = op.parse_args()

    if not options.configFilePath:
        raise Exception("Configuration file path must be given as parameter.")

    if args:
        raise Exception("No arguments allowed.")

    app = MessaWeb(options.configFilePath, production=options.production)
    if options.production:
        import cherrypy.wsgiserver
        # This won't call the CherryPy engine (application side) at all, only the
        # WSGI server, which is independant from the rest of CherryPy. Don't
        # let the name "CherryPyWSGIServer" throw you; the name merely reflects
        # its origin, not its coupling.
        server = cherrypy.wsgiserver.CherryPyWSGIServer(
            ("0.0.0.0", int(options.port)), app)
        try:
            server.start()
        except KeyboardInterrupt:
            server.stop()

    else:
        werkzeug.run_simple("localhost", int(options.port), app, use_reloader=True)



