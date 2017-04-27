pyvenv=pyvenv-3.4
venv_dir=venv
docker_image_name=www_messa_cz

flask-run: venv
	PYTHONPATH=. PYTHONDONTWRITEBYTECODE=1 \
	FLASK_APP=messa_web FLASK_DEBUG=1 \
		$(venv_dir)/bin/flask run

venv: $(venv_dir)/requirements-installed

$(venv_dir)/requirements-installed: requirements.txt
	test -d $(venv_dir) || $(pyvenv) $(venv_dir)
	$(venv_dir)/bin/pip install -U pip
	$(venv_dir)/bin/pip install -r requirements.txt
	touch $@

docker-image:
	docker build -t $(docker_image_name) .

docker-run: docker-image
	docker run --rm -p 8000:8000 $(docker_image_name)

.PHONY: flask-run venv
