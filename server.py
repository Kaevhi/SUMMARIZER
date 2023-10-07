from http.server import SimpleHTTPRequestHandler, HTTPServer
import urllib
from youtube_transcript_api import YouTubeTranscriptApi
import json
import os

class CustomHandler(SimpleHTTPRequestHandler):
    
    def do_GET(self):
        if self.path == "/":
            # Serve your landing page
            self.path = '/path_to_your_html_files/landingPage.html' 
            return super().do_GET()

        elif self.path.startswith("/transcript"):
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            video_id = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query).get('video_id', [None])[0]

            if not video_id:
                self.wfile.write(json.dumps({"error": "Video ID not provided."}).encode())
                return

            try:
                transcripts, not_found = YouTubeTranscriptApi.get_transcripts([video_id], continue_after_error=True)
                if video_id in transcripts:
                    self.wfile.write(json.dumps(transcripts[video_id]).encode())
                else:
                    self.wfile.write(json.dumps({"error": "Transcript cannot be created from video."}).encode())
            except Exception as e:
                self.wfile.write(json.dumps({"error": f"An error occurred: {e}"}).encode())
        else:
            return super().do_GET() 

if __name__ == '__main__':
    os.chdir('./')
    server_class = HTTPServer
    httpd = server_class(('0.0.0.0', 8000), CustomHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
