# AICE CUBE

Discord bot named after a legendary rapper...

sudo apt install ffmpeg -y

## Getting Started

### Updating Packages

```
sudo apt update
```

```
sudo apt upgrade
```

### (Optional) Installing NVM

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

```
source ~/.bashrc
```

```
nvm install node
```

### Installing Dependencies

```
sudo apt install ffmpeg -y
```

```
npm install
```

### Creating Additional Config Files

Create an environment file (.env) in root directory

```
DISCORD_TOKEN=''
DISCORD_CLIENT_ID=''
DISCORD_GUILD_ID=''
DISCORD_BOT_ADMIN_USERNAME=''
```

Create a cookies file (cookies.txt) using youtube cookies in root directory. The file must have the following format. Use a browser extension to get this file.

```
# Netscape HTTP Cookie File
# http://curl.haxx.se/rfc/cookie_spec.html
# This is a generated file!  Do not edit.

{ LIST OF COOKIES }
```

### Running the App (For dev)

```
npm run dev
```

### Running the App (Docker for 'production')

```
docker build -t aicecube .
```

```
docker run -t aicecube
```