# -*- coding: utf-8 -*-

"""
Funkce zpracovávající a generující jednotlivé stránky webu.
"""

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
    """
    Titulní stránka - česká verze.
    """
    t = {
        "lang": "cs",
        "analytics": (suite.web.production and
                      suite.request.cookies.get("analytics") != "no"),
        "analyticsCode": suite.web.analyticsCode,
    }
    return TemplateResponse("hp.html", t)


def hp_en(suite):
    """
    Titulní stránka - anglická verze.
    """
    t = {
        "lang": "en",
        "analytics": (suite.web.production and
                      suite.request.cookies.get("analytics") != "no"),
        "analyticsCode": suite.web.analyticsCode,
    }
    return TemplateResponse("hp.html", t)


def no_analytics(suite):
    """
    Stránka, která nastaví cookie, aby se uživateli nezobrazoval kód pro
    měření návštěvnosti. Určeno především pro samotného autora webu.
    """
    response = werkzeug.Response("OK")
    response.set_cookie("analytics", value="no", max_age=86400 * 365)
    return response


def get_url_map():
    """
    URL routing.
    """
    from werkzeug.routing import Map, Rule
    return Map([
        Rule("/", endpoint=hp),
        Rule("/cs/", endpoint=hp_cs),
        Rule("/en/", endpoint=hp_en),
        Rule("/no-analytics", endpoint=no_analytics),
    ])


