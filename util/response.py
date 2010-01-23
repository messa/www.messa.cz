# -*- coding: utf-8 -*-

import hashlib
import os
import werkzeug

import util.various


class TemplateResponse:

    def __init__(self, templateName, templateData=None):
        self.templateName = templateName
        self.templateData = dict(templateData) if templateData else dict()

    def render(self, suite):
        template = suite.web.templateLoader.load(self.templateName)

        def static_url(filename):
            path = os.path.join(suite.web.staticDir, filename)
            fileHash = hashlib.sha1(open(path).read()).hexdigest()[:7]
            return "/static/%s?%s" % (filename, fileHash)

        self.templateData["static_url"] = static_url
        self.templateData["obfuscate"] = util.various.obfuscate
        stream = template.generate(**self.templateData)
        html = stream.render("xhtml", doctype="xhtml-strict")
        return werkzeug.Response(html, mimetype="text/html")


