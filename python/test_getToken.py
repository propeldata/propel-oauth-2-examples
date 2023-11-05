# test_getToken.py

import unittest
from getToken import (
    get_token,
)


class TestTokenFetch(unittest.TestCase):
    def test_token_fetch(self):
        token = get_token()
        self.assertIsNotNone(token)
        self.assertIsInstance(token, str)
        print(token)


if __name__ == "__main__":
    unittest.main()
