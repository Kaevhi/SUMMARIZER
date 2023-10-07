from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    with open('physics_summary.txt', 'r') as file:
        content = file.read()
    
    return render_template('template.html', content=content)

if __name__ == '__main__':
    app.run(debug=True)