from pathlib import Path
import secrets

'''
runs all the setup required in the enviornment to get this project to work.
'''
if __name__ == '__main__':
    BASE = Path(__file__).parent.resolve()
    data = {
        'secret_key': secrets.token_hex(),
    }

    with open(BASE / '.env', 'w') as env_file:
        lines = [f'{k}={v}\n' for k, v in data.items()]
        env_file.writelines(lines)
