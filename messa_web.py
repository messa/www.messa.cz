#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
„Jádro“ webové aplikace.
Tento soubor obsahuje WSGI aplikaci + kód pro její spuštění.
"""

import genshi.template
import optparse
import os
import traceback
import werkzeug

import util.various
import views


class Suite:
    """
    Objekt obsahující referenci na objekt webu, HTTP požadavku apod.
    Předává se funkcím, které zpracovávají konkrétní stránky.
    """

    def __init__(self, web, request, urlMapAdapter):
        (self.web, self.request, self.urlMapAdapter) = (web, request, urlMapAdapter)

    def url_for(self, target, **args):
        return self.urlMapAdapter.build(target, args)


class MessaWeb:
    """
    Objekt uceleně reprezentující celý web.
    Chová se také jako WSGI aplikační objekt.
    """

    def __init__(self, configFilePath, production):
        """
        Jako parametr se předává cesta ke konfiguračnímu souboru a příznak,
        zda je web spuštěn v produkčním prostředí (je zobrazován kód pro
        měření návštěvnosti apod.).
        """
        # zpracování konfigurace

        self.production = production
        self.configuration = util.various.parse_configuration_file(configFilePath)
        self.analyticsCode = self.configuration["analytics.code"]

        # URL routing

        self.urlMap = views.get_url_map()

        # nastavení adresářů a cest

        self.baseDir = os.path.dirname(os.path.abspath(__file__))
        templateDir = os.path.join(self.baseDir, "templates")
        self.staticDir = os.path.join(self.baseDir, "static")
        assert os.path.isdir(templateDir)
        assert os.path.isdir(self.staticDir)

        # HTML šablony

        self.templateLoader = genshi.template.TemplateLoader(
            [templateDir], auto_reload=True)

        # zabalení dispatcheru do WSGI aplikace

        self.app = werkzeug.Request.application(self.dispatch)
        self.app = werkzeug.SharedDataMiddleware(self.app, {
            "/static": self.staticDir})

    def dispatch(self, request):
        """
        Zpracování požadavku.
        Dle URL routování vybere správný handler a provede ho.
        """
        try:
            urlMapAdapter = self.urlMap.bind_to_environ(request.environ)
            try:
                (handler, args) = urlMapAdapter.match()
            except werkzeug.routing.HTTPException, e:
                return e  # Např. 404 nebo přesměrování.

            suite = Suite(self, request, urlMapAdapter)

            response = handler(suite, **args)

            if not isinstance(response, werkzeug.BaseResponse):
                response = response.render(suite)

            assert isinstance(response, werkzeug.BaseResponse)
            return response
        except:
            exc = traceback.format_exc()
            print exc
            if not self.production:
                return werkzeug.Response("Server Error\n\n" + exc, status=500)
            return werkzeug.Response("Server Error", status=500)

    def __call__(self, environ, start_response):
        """
        Zpracování WSGI požadavku.
        Způsobí zavolání metody dispatch().
        """
        return self.app(environ, start_response)


def main():
    """
    Vstupní bod programu, pokud je spuštěn přímo.
    Zpracování parametrů příkazové řádky a spuštění webu.
    """
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
        # Spuštění v produkčním prostředí (tj. na serveru a budou na to „lézt lidi“).
        # Použijeme WSGI HTTP server z projektu CherryPy.
        import cherrypy.wsgiserver
        # This won't call the CherryPy engine (application side) at all, only the
        # WSGI server, which is independant from the rest of CherryPy. Don't
        # let the name "CherryPyWSGIServer" throw you; the name merely reflects
        # its origin, not its coupling. (převzato z dokumentace)
        server = cherrypy.wsgiserver.CherryPyWSGIServer(
            ("0.0.0.0", int(options.port)), app)
        try:
            server.start()
        except KeyboardInterrupt:
            server.stop()

    else:
        # Spuštění pro vývojové prostředí (tj. pro nás a pro snadnější ladění).
        # Při změně zdrojového kódu je web automaticky restartován.
        werkzeug.run_simple("localhost", int(options.port), app, use_reloader=True)


if __name__ == "__main__":
    main()


