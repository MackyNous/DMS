from flask import Flask, render_template, jsonify
JSONIFY_PRETTYPRINT_REGULAR = True
import docker
from docker import DockerClient
client = docker.from_env()

errorMsg = "Something is wrong with the docker API, try to run the server with elevated rights or restart the docker daemon"

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

def testConn():
    client.containers.run("hello-world", detach=True)
    

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/testApi")
def testApi():
    try:
        testConn()
        return jsonify(client.version())
    except docker.errors.APIError: 
        return errorMsg

@app.route("/api/listContainers")
def listContainers():
    try:
        print("API call to /listContainers has been made")
        return jsonify([ (container.id, container.name) for container in client.containers.list(all)]).get_data(as_text=True)
    except:
        return errorMsg

@app.route("/api/startContainer/<conID>")
def startContainer(conID):
    container = client.containers.get(conID) 
    try:
        container.start()
        print(container.id + " has been started")
        return client.containers.get(conID).id + " has been started"
    except docker.errors.APIError: 
        print("container could not be started")
        return "container could not be started"
    

@app.route("/api/container/<conID>")
def containerID(conID):
    try:
        return jsonify(client.containers.get(conID).attrs)
    except (docker.errors.NotFound, docker.errors.APIError):
        return "Container does not exist or has been mistyped"

if __name__ == '__main__':
    app.run()