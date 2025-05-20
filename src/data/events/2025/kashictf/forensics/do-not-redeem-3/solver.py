import gzip
import os
from json import loads
import datetime

# for every ".1" file in the current directory
full = []
for filename in os.listdir('/mnt/d/Backup/kitler\'s-phone.tar/kitler\'s-phone/data/data/com.discord/cache/http-cache/'):
    if filename.endswith('.1'):
        with open(f'/mnt/d/Backup/kitler\'s-phone.tar/kitler\'s-phone/data/data/com.discord/cache/http-cache/{filename}', 'rb') as f:
            try:
                raw = f.read()
                # decode the base64 and decompress the gzip data
                data_raw = gzip.decompress(raw)
                # parse the JSON data
                data = loads(data_raw.decode('utf-8'))
                full.extend(data)
                # write the decompressed data to a file
                with open(filename + '.decompressed', 'wb') as f:
                    f.write(data_raw)
            except Exception as e:
                pass

for message in full:
    print(message['timestamp'], message['author']['username'], message['content'], message['attachments'])
