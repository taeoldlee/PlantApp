import serial

# Update the serial port and baud rate
ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1)  # 1 second timeout

while True:
    try:
        data = ser.readline().decode('utf-8').strip()  # Read and decode serial data
        if data:
            print(f"Received data: {data}")
    except serial.SerialException as e:
        print(f"Error reading serial data: {e}")
        break
