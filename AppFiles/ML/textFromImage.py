import cv2
import numpy as np
import requests
import io
import json
import sys

import re


img = cv2.imread("screenshot2.jpg")

height, width, _ = img.shape

# Cutting image
# roi = img[0: height, 400: width]
roi = img

# Ocr
url_api = "https://api.ocr.space/parse/image"
_, compressedimage = cv2.imencode(".jpg", roi, [1, 90])
file_bytes = io.BytesIO(compressedimage)

result = requests.post(url_api,
              files = {"screenshot.jpg": file_bytes},
              data = {"apikey": "K85471571088957",
                      "language": "eng"})

result = result.content.decode()
result = json.loads(result)

parsed_results = result.get("ParsedResults")[0]
text_detected = parsed_results.get("ParsedText")

mydata = re.sub(r"[^a-zA-Z0-9 ]", "", result.get("ParsedResults")[0].get("ParsedText"))

resp = {
    "Response": 200,
    "Message": "Data from Python",
    "MyData": mydata
    
}

print(json.dumps(resp))

sys.stdout.flush()