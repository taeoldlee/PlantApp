import time
import serial
import requests

ser = serial.Serial('/dev/ttyACM1', 115200, timeout=1)
if not ser.isOpen():
    exit("Failed to open serial port")
time.sleep(2)  # Let Pico reset

# Session for chat
session_id = None

while True:
    try:
        line = ser.readline().decode('utf-8').strip()
        if line:
            print(f"Read from Pico: {line}")

            payload = {
                "plant_type": "tomato",
                "plant_name": "Tommy",
                "user_message": line,
                "session_id": session_id
            }

            response = requests.post("https://plantapp-z7dw.onrender.com/chat", json=payload)
            data = response.json()
            session_id = data.get("session_id")  # Keep using same session

            print(f"Response: {data.get('response')}")

    except KeyboardInterrupt:
        print("Exiting.")
        break
    except Exception as e:
        print(f"Error: {e}")
        time.sleep(1)
