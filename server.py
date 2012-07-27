#! /usr/bin/env python

import cgi, os, SocketServer, sys, time, urllib2, urlparse
from SimpleHTTPServer import SimpleHTTPRequestHandler
from StringIO import StringIO

class ProxyHandler(SimpleHTTPRequestHandler):

    def handle_request(self):
        if 'X-StackMob-Proxy-Plain' in self.headers:
            # PROXY TO STACKMOB
            print "Proxying Request"
            self.log_request()

            # Determine Path
            path = 'http://api.mob1.stackmob.com' + self.path

            # Determine Headers
            headers = {}
            for key_val in self.headers.items():
                headers[ key_val[0].upper() ] = key_val[1]

            # Overwrite host header for Proxy
            netloc = headers['HOST']
            i = netloc.find(':')
            if i >= 0:
                host = netloc[:i], int(netloc[i+1:])
            else:
                host = netloc, 80

            headers['HOST'] = 'api.mob1.stackmob.com'
            headers['X-FORWARDED-FOR'] = host[0]
            headers['X-STACKMOB-FORWARDED-PORT'] = host[1]
            headers['X-STACKMOB-FORWARDED-HOST'] = host[0]
            headers['X-FORWARDED-PROTO'] = 'HTTP'
            headers['VERSION'] = 'HTTP/1.1'

            print 'Proxy Headers'
            for key in headers:
                print key, ": ", headers[ key ]

            # Determine Body Content
            if 'CONTENT-LENGTH' in self.headers:
                content_len = int(self.headers.getheader('content-length'))
                data = self.rfile.read(content_len)
            else: data = None

            # Create Request
            opener = urllib2.build_opener(urllib2.HTTPHandler)
            if data is None:
                req = urllib2.Request(path, headers=headers)
            else:
                req = urllib2.Request(path, data, headers)

            # Connect
            req.get_method = lambda: self.command
            try:
                url = urllib2.urlopen(req)
                # Send response back to client
                self.connection.send('HTTP/1.1 ' + str(url.getcode()) + ' ' + url.msg + '\r\n')
                for item in url.info().headers:
                    self.connection.send( item )
                self.connection.send("\r\n")
                self.connection.send( url.read() )
                self.connection.close()
            except urllib2.HTTPError, e:
                self.connection.send('HTTP/1.1 ' + str(e.code) + ' ' + e.msg + '\r\n')
                for item in e.headers:
                    self.connection.send( item + ": " + e.headers[ item ] + '\r\n')
                self.connection.send("\r\n")
                self.connection.send( e.fp.read() )
                self.connection.close()

            return None

        else:
            # Default Web Server
            f = self.send_head()
            if f:
                self.copyfile(f, self.wfile)
                f.close()

    do_GET = handle_request
    do_POST = handle_request
    do_HEAD = handle_request
    do_PUT = handle_request
    do_DELETE = handle_request

httpd = SocketServer.TCPServer(("", 4567), ProxyHandler)
print "serving at port", 4567
httpd.serve_forever()
