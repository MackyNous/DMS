from flask import Flask, render_template, jsonify
import docker
client = docker.from_env()

errorMsg = "Something is wrong with the docker API, try to run the server with elevated rights or restart the docker daemon"

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

def testConn():
    client.containers.run("hello-world", detach=True)
    

@app.route("/")
def index():
    return render_template("index.html")
'''
@app.route("/api/testApi")
def testApi():
    try:
        testConn()
        return "Docker API is working correctly"
    except: 
        return errorMsg
'''
@app.route("/api/listContainers")
def listContainers():
    #containers = client.container.list(all)
    #for container in client.containers.list():
    #    print container.id
    #try:
        print("API call to /listContainers has been made")
        return jsonify([ (container.id, container.name) for container in client.containers.list(all)]).get_data(as_text=True)
    #except:
    #    return errorMsg

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