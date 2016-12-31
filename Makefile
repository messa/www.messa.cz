pyvenv=pyvenv-3.4
venv_dir=venv

flask-run: venv
	PYTHONPATH=. FLASK_APP=messa_web FLASK_DEBUG=1 \
		$(venv_dir)/bin/flask run

venv: $(venv_dir)/requirements-installed

$(venv_dir)/requirements-installed: requirements.txt
	test -d $(venv_dir) || $(pyvenv) $(venv_dir)
	$(venv_dir)/bin/pip install -U pip
	$(venv_dir)/bin/pip install -r requirements.txt
	touch $@

.PHONY: flask-run venv
