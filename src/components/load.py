# cpu_stress.py
import multiprocessing, math

def cpu_task():
    while True:
        math.sqrt(123456789)  # endless calculation

if __name__ == "__main__":
    for _ in range(multiprocessing.cpu_count()):
        multiprocessing.Process(target=cpu_task).start()
