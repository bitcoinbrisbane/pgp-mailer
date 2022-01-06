# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gmail_quickstart]
from __future__ import print_function

import os.path
import base64

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from email.mime.text import MIMEText

from pgpy import PGPKey
from pgpy import PGPMessage

import requests

# If modifying these scopes, delete the file token.json.
# https://stackoverflow.com/questions/40186856/403-request-had-insufficient-authentication-scopes-when-creating-drafts-in-goo
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send']


def main():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        # Call the Gmail API
        service = build('gmail', 'v1', credentials=creds)
        results = service.users().labels().list(userId='me').execute()
        labels = results.get('labels', [])

        #  https://api.protonmail.ch/pks/lookup?op=get&search=username@protonmail.com

        # Assume the sender has retrieved the public key and saved it to a file.
        # reload the public key
        url = 'https://api.protonmail.ch/pks/lookup?op=get&search=lucascullen@protonmail.ch'

        url = 'https://keys.openpgp.org/vks/v1/by-email/saskianeale@saskialaw.com'

        headers = {'user-agent': 'pgp/0.0.1'}
        response = requests.get(url, headers=headers)
        print(response.content)



        pubkey, _ = PGPKey.from_blob(response.content)
        # pubkey, _ = PGPKey.from_file("lucascullen.asc")
        print(pubkey)

        # As usual, construct a PGPMessage from a string:
        _message = PGPMessage.new("testing from my app")

        # Transform it into a new PGPMessage that contains an encrypted form of the
        # unencrypted message
        encrypted_message = pubkey.encrypt(_message)
        print(encrypted_message)

        message = create_message("lucascullen1979@gmail.com", "saskianeale@saskialaw.com", "test", str(encrypted_message))
        send_message(service, "me", message)

        if not labels:
            print('No labels found.')
            return
        print('Labels:')
        for label in labels:
            print(label['name'])

    except HttpError as error:
        # TODO(developer) - Handle errors from gmail API.
        print(f'An error occurred: {error}')


def create_message(sender, to, subject, message_text):
  """Create a message for an email.

  Args:
    sender: Email address of the sender.
    to: Email address of the receiver.
    subject: The subject of the email message.
    message_text: The text of the email message.

  Returns:
    An object containing a base64url encoded email object.
  """
  message = MIMEText(message_text)
  message['to'] = to
  message['from'] = sender
  message['subject'] = subject

  b64_bytes = base64.urlsafe_b64encode(message.as_bytes())
  b64_string = b64_bytes.decode()
  return {'raw': b64_string}


def send_message(service, user_id, message):
  """Send an email message.

  Args:
    service: Authorized Gmail API service instance.
    user_id: User's email address. The special value "me"
    can be used to indicate the authenticated user.
    message: Message to be sent.

  Returns:
    Sent Message.
  """
#   try:
  message = (service.users().messages().send(userId=user_id, body=message)
                .execute())
  print('Message Id: %s' % message['id'])
  return message

#   except errors.HttpError, error:
#     print('An error occurred: %s' % error)


if __name__ == '__main__':
    main()
# [END gmail_quickstart]