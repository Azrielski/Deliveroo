from app import create_app

app = create_app()

@app.route('/')
def home():
    return "Deliveroo:Fast and Efficient delivery!"


if __name__ == '__main__':
    app.run(debug=True)
