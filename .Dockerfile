FROM docker/compose:latest
COPY . /workspace
WORKDIR /workspace
CMD ["docker-compose", "up"]
