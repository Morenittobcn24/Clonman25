#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

class DevServer:
    def __init__(self, port=8000, directory=None):
        self.port = port
        self.directory = directory or os.getcwd()
        
    def start(self):
        os.chdir(self.directory)
        
        class CustomHandler(http.server.SimpleHTTPRequestHandler):
            def end_headers(self):
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.send_header('Pragma', 'no-cache')
                self.send_header('Expires', '0')
                super().end_headers()
            
            def log_message(self, format, *args):
                print(f"[{self.address_string()}] {format % args}")
        
        with socketserver.TCPServer(("", self.port), CustomHandler) as httpd:
            print(f"🚀 Servidor de desarrollo iniciado")
            print(f"📂 Directorio: {self.directory}")
            print(f"🌐 URL: http://localhost:{self.port}")
            print(f"📱 Para abrir en el navegador: $BROWSER http://localhost:{self.port}")
            print(f"⏹️  Presiona Ctrl+C para detener")
            print("-" * 50)
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🛑 Servidor detenido")
                httpd.shutdown()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server = DevServer(port)
    server.start()
