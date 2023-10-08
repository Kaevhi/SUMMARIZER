#from  mainreimagined import app  # assuming your main Flask application file is named 'app.py'
#import os

def test_upload_and_process():
    tester = app.test_client()
    with open('testingtesting.docx', 'rb') as f:
        response = tester.post('/upload', 
                               content_type='multipart/form-data',
                               data={'file': (f, 'sample.docx')})  # replace with your actual file name

    print(response.data)  # This will print the response from the server

if __name__ == "__main__":
    test_upload_and_process()
