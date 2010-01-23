# -*- coding: utf-8 -*-

import hashlib
import os
import werkzeug

import util.various


class TemplateResponse:
    """
    Abstrakce vygenerování HTML šablony.

    Vygenerování HTML šablony obnáší jisté množství kódu, které nemá co dělat
    v každé „view“ funkci; proto je zde a view funkce pouze dodá základní
    informace.
    """

    def __init__(self, templateName, templateData=None):
        self.templateName = templateName
        self.templateData = dict(templateData) if templateData else dict()

    def render(self, suite):
        """
        Voláno z dispatcheru pro samotné vytvoření Response objektu, který
        bude vrácen Werkzeug/WSGI vrstvě.
        """
        template = suite.web.templateLoader.load(self.templateName)

        # doplnění věcí, které šablona může potřebovat

        def static_url(filename):
            path = os.path.join(suite.web.staticDir, filename)
            fileHash = hashlib.sha1(open(path).read()).hexdigest()[:7]
            return "/static/%s?%s" % (filename, fileHash)

        self.templateData["static_url"] = static_url
        self.templateData["obfuscate"] = util.various.obfuscate

        # vygenerování šablony

        stream = template.generate(**self.templateData)
        html = stream.render("xhtml", doctype="xhtml-strict")
        return werkzeug.Response(html, mimetype="text/html")


