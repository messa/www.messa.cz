# -*- coding: utf-8 -*-

"""
Různé pomocné funkce.
"""

import genshi


def parse_configuration_file(path):
    """
    Načtení konfigurace (zpracování souboru s konfigurací).
    """
    configuration = dict()
    f = open(path)
    for lineNo, line in enumerate(f):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split(None, 1)
        if len(parts) != 2:
            raise Exception("%s:%s: parse error" % (path, lineNo+1))
        key, value = parts
        configuration[key] = value
    return configuration


def obfuscate(s):
    """
    Nechci, aby e-mailové adresy byly v HTML kódu uvedeny přímo; trochu je
    zakódujeme. Samozřejmě to není stoprocentní ochrana, ale snad bude pro
    většinu spambotů stačit.
    """
    return genshi.Markup(
        s.replace("@", "&#64;<!--\r\n -->")
         .replace(".", "&#46;<!--\r\n -->"))


