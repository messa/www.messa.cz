python3=python3.5
venv_dir=venv
docker_image_name=www_messa_cz
container_name_prefix=www_messa_cz
live_port=10002
temp_port=10003
docker_deploy_args=--restart unless-stopped -e "WWW_MESSA_CZ_GA_ID=$(shell cat ~/.config/www_messa_cz_ga_id)"

flask-run: venv
	PYTHONPATH=. PYTHONDONTWRITEBYTECODE=1 \
	FLASK_APP=messa_web FLASK_DEBUG=1 \
		$(venv_dir)/bin/flask run

venv: $(venv_dir)/requirements-installed

$(venv_dir)/requirements-installed: requirements.txt
	test -d $(venv_dir) || $(python3) -m venv $(venv_dir)
	$(venv_dir)/bin/pip install -U pip
	$(venv_dir)/bin/pip install -r requirements.txt
	touch $@

docker-image:
	docker build -t $(docker_image_name) .

docker-run: docker-image
	docker run --rm -p 8000:8000 $(docker_image_name)

remote-deploy:
	ssh www.messa.cz make -C weby/www.messa.cz deploy

deploy:
	git pull --ff-only
	make docker-image
	make deploy-temp
	sleep 2
	curl -fs http://localhost:$(temp_port)/_ok || ( make deploy-stop-temp; false )
	make deploy-live
	sleep 2
	curl -fs http://localhost:$(live_port)/_ok
	make deploy-stop-temp
	@echo Done

deploy-live:
	docker stop $(container_name_prefix)_live || true
	docker rm   $(container_name_prefix)_live || true
	docker run -d --name $(container_name_prefix)_live -p $(live_port):8000 $(docker_deploy_args) $(docker_image_name)

deploy-temp:
	docker stop $(container_name_prefix)_temp || true
	docker rm   $(container_name_prefix)_temp || true
	docker run -d --name $(container_name_prefix)_temp -p $(temp_port):8000 $(docker_deploy_args) $(docker_image_name)

deploy-stop-temp:
	docker stop $(container_name_prefix)_temp || true

run-deploy-demo-nginx:
	/usr/sbin/nginx -c nginx.sample.conf -p $(PWD)

.PHONY: flask-run venv
