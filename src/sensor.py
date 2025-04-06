from machine import Pin, ADC
import time

# Define the soil sensor connected to ADC pin
soil_sensor = ADC(Pin(26))  # GPIO26 (ADC0)

# Function to read moisture level
def read_soil_moisture():
    moisture_value = soil_sensor.read_u16()  # Read 16-bit value
    return moisture_value

while True:
    
    moisture = read_soil_moisture()
    percent = 100 - int((moisture - 12000) / (60000 - 12000) * 100)
    print("Soil Moisture Level:", percent)
    time.sleep(1)
