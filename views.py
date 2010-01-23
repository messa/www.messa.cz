# -*- coding: utf-8 -*-

import werkzeug

from util.response import TemplateResponse


def hp(suite):
    """
    Přesměrování na jazykovou verzi dle uživatelovo preferencí (hlavičky
    Accept-Language).
    """
    al = suite.request.accept_languages
    enScore = max(al["en"], al["en-us"])
    csScore = max(al["cs"], al["cs-cz"])
    if csScore > enScore:
        return werkzeug.redirect(suite.url_for(hp_cs))
    return werkzeug.redirect(suite.url_for(hp_en))


def hp_cs(suite):
    t = {
        "lang": "cs",
        "analytics": suite.web.production,
        "analyticsCode": suite.web.analyticsCode,
    }
    return TemplateResponse("hp.html", t)


def hp_en(suite):
    t = {
        "lang": "en",
        "analytics": suite.web.production,
        "analyticsCode": suite.web.analyticsCode,
    }
    return TemplateResponse("hp.html", t)


def get_url_map():
    from werkzeug.routing import Map, Rule
    return Map([
        Rule("/", endpoint=hp),
        Rule("/cs/", endpoint=hp_cs),
        Rule("/en/", endpoint=hp_en),
    ])


