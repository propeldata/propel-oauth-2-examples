from oauthlib.oauth2 import BackendApplicationClient
from requests.auth import HTTPBasicAuth
from requests_oauthlib import OAuth2Session
from dotenv import load_dotenv
import os

load_dotenv()


def get_token():
    client_id = os.environ.get("CLIENT_ID")
    client_secret = os.environ.get("CLIENT_SECRET")
    token_url = os.environ.get("TOKEN_HOST") + os.environ.get("TOKEN_PATH")

    auth = HTTPBasicAuth(client_id, client_secret)
    client = BackendApplicationClient(client_id=client_id)
    oauth = OAuth2Session(client=client)

    try:
        token = oauth.fetch_token(token_url=token_url, auth=auth)
        return token["access_token"]
    except Exception as e:
        print(f"Access Token Error: {str(e)}")
        return None
