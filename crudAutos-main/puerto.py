import psutil

def find_process_using_port(port):
    for proc in psutil.process_iter(['pid', 'name']):
        try:
            for conn in proc.connections(kind='inet'):
                if conn.laddr.port == port:
                    print(f"Process {proc.info['name']} (PID: {proc.info['pid']}) is using port {port}")
                    return proc.info['pid']
        except psutil.AccessDenied:
            continue
        except psutil.NoSuchProcess:
            continue
    print(f"No process found using port {port}")
    return None

port_to_check = 5000
find_process_using_port(port_to_check)
