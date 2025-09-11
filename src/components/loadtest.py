# memory_stress.py
data = []
while True:
    data.append("X" * 10**6)  # allocate 1MB repeatedly
