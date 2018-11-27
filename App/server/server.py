from flask import Flask, render_template
#import docker
#client = docker.from_env()

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/hello")
def hello():
    return "Hello World!"

@app.route("/api/listContainers")
def listContainers():
    #containers = client.container.list(all)
    #for container in client.containers.list():
    #    print container.id
    return "TODO"

@app.route("/api/container")
def container():
    print("Docker container test")
    return "call docker container test"

@app.route("/api/container/<conID>")
def containerID(conID):
    print("DOCKER API LIST CONTAINER DATA")
    return "call to our Docker API"


if __name__ == '__main__':
    app.run()