🔒Hidden File Vault using Hybrid Cryptography

## Overview
Hidden File Vault is a web-based application that encrypts multiple files using AES encryption and securely hides them within a vault, accessible only through a valid passphrase.
Users can upload files, encrypt them individually, download the encryption keys, and later decrypt the hidden files by providing the correct passphrase and corresponding .key file.

## Features
- AES-based file encryption (client-side with CryptoJS)

- Multiple file upload and encryption at once

- Automatic encryption key generation and .key file download

- Passphrase-protected hidden vault for securing access

- Secure decryption with uploaded key file

- Fast, lightweight, and fully browser-based (React + Chakra UI)

- No file or key sent to any server - 100% client-side security

## Technologies Used

- React.js - Frontend framework

- Chakra UI - UI component library

- CryptoJS - AES encryption/decryption

- Node.js - Backend

## Project Structure
```
/src
  ├── App.jsx
  ├── EncryptionSection.jsx
  ├── DecryptionSection.jsx
  ├── main.jsx
/public
  ├── index.html
README.md
package.json
```
## How to Run Locally

Clone the repository:
git clone https://github.com/your-username/hidden-file-vault.git

- Install dependencies:
npm install
- Run the application:
npm run dev
Open your browser and visit http://localhost:5173/ (if using Vite) or wherever your dev server runs.

## How It Works

1. Select multiple files and encrypt them; each file gets a random AES key.
2. Download the .key file generated for decryption later.
3. Files are hidden inside the app’s vault, locked behind a passphrase.
4. To decrypt, enter the passphrase, choose the file, and upload the .key file.
5. Decrypted file becomes available for download!

## Future Enhancements

- RSA encryption for secure automatic key management

- Automatic timed key deletion after use

- Integration of multi-factor authentication (MFA)

- Optional secure cloud vault backup

- Decoy files for plausible deniability
