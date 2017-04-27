pyvenv=pyvenv-3.4
venv_dir=venv
docker_image_name=www_messa_cz
container_name_prefix=www_messa_cz
live_port=8111
temp_port=8222

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

deploy:
	git pull --ff-only
	make docker-image
	make deploy-temp
	sleep 2
	curl http://localhost:$(temp_port)/_ok || ( make stop-temp; exit 1 )
	make deploy-live
	sleep 2
	curl http://localhost:$(live_port)/_ok
	make stop-temp
	@echo Done

deploy-live:
	docker stop $(container_name_prefix)_live || true
	docker rm   $(container_name_prefix)_live || true
	docker run -d --name $(container_name_prefix)_live -p $(live_port):8000 $(docker_image_name)

deploy-temp:
	docker stop $(container_name_prefix)_temp || true
	docker rm   $(container_name_prefix)_temp || true
	docker run -d --name $(container_name_prefix)_temp -p $(temp_port):8000 $(docker_image_name)

stop-temp:
	docker stop $(container_name_prefix)_temp || true

run-deploy-demo-nginx:
	/usr/sbin/nginx -c nginx.sample.conf -p $(PWD)

.PHONY: flask-run venv
