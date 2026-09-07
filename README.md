# Fan Market

A small online shop that sells computer case fans. It is deliberately simple:
one React front end, one Express back end, no database, no login, no payments.

The **Checkout** button does nothing on purpose — real payments come later.

---

## What is in the box

| Folder    | What it is                                                       |
| --------- | ---------------------------------------------------------------- |
| `client/` | The website you see in the browser. React + TypeScript + Vite.    |
| `server/` | The API that hands out the list of fans. Express + TypeScript.    |

Three pages:

1. **Home** (`/`) — the landing page with a few featured fans.
2. **Shop Fans** (`/fans`) — the full list, with search, brand filter and sort.
3. **Cart** (`/cart`) — what you picked, and a Checkout button that goes nowhere.

### How the two halves talk to each other

```
Browser  ──▶  Vite dev server (port 5173)  ──▶  Express API (port 4000)
                     the React app              /api/fans, /api/health
```

When the React code calls `fetch("/api/fans")`, Vite quietly forwards that
request to the Express server on port 4000. That forwarding rule lives in
`client/vite.config.ts`. You never have to type port 4000 in the browser.

---

## Setting this up in WSL

You only do this part once.

### 1. Open your WSL terminal

Press the Windows key, type `Ubuntu` (or `WSL`), and open it. Everything below
is typed into that black terminal window, not into Windows PowerShell.

> **Important:** keep this project inside the Linux file system
> (e.g. `~/projects/fan-market`), **not** in `/mnt/c/...`. Node is dramatically
> slower on `/mnt/c`, and file watching often breaks there.

### 2. Update the package list

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git
```

### 3. Install nvm (Node Version Manager)

Do **not** use `sudo apt install nodejs` — the version Ubuntu ships is usually
far too old for this project. Use nvm instead:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Then close the terminal and open a new one (or run `source ~/.bashrc`), so that
the `nvm` command becomes available. Check it worked:

```bash
nvm --version
```

### 4. Install Node.js 20 (LTS)

This project needs **Node.js 20 or newer**. Node 20 LTS is the safe choice.

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

Confirm the versions:

```bash
node -v    # should print v20.x.x or higher
npm -v     # should print 10.x.x or higher
```

### 5. Get the project and install its dependencies

```bash
cd ~
mkdir -p projects
cd projects
# copy or clone the fan-market folder into here, then:
cd fan-market
npm install
```

`npm install` at the top level installs the packages for **both** `client` and
`server` at once. This project uses npm workspaces, so you do not need to run
install inside each folder. The first run takes a minute or two.

---

## Running the app

From the `fan-market` folder:

```bash
npm run dev
```

That starts both halves at the same time. You should see something like:

```
[server] Fan Market API is running on http://localhost:3000
[client] ➜  Local:   http://localhost:5173/
```

Now open **http://localhost:5173** in your normal Windows browser. WSL forwards
`localhost` automatically, so there is nothing extra to configure.

Press `Ctrl + C` in the terminal to stop everything.

### Running just one half

Useful when you are only working on one side:

```bash
npm run dev:server   # just the Express API, on port 4000
npm run dev:client   # just the React app, on port 5173
```

If you run only the client, the fan list will fail to load — the client needs
the server to be running.

### Checking the API by hand

```bash
curl http://localhost:4000/api/health
curl http://localhost:4000/api/fans
```

Add `| jq` on the end if you have `jq` installed and want it formatted nicely.

---

## Everyday commands

| Command             | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Start the API and the website together (the normal one).   |
| `npm run dev:server`| Start only the Express API.                                |
| `npm run dev:client`| Start only the React website.                              |
| `npm run typecheck` | Check for TypeScript mistakes without running anything.    |
| `npm run build`     | Build both halves for production.                          |

---

## When something goes wrong

**`command not found: node` or `command not found: npm`**
Your terminal has not picked up nvm. Run `source ~/.bashrc`, or close and
reopen the terminal, then `nvm use 20`.

**`EADDRINUSE: address already in use :::4000`**
Something is already using port 4000 — probably an old copy of the server that
did not shut down. Find it and stop it:

```bash
lsof -i :4000        # shows the PID
kill -9 <the PID>
```

**The page loads but says "We could not reach the shop server."**
The Express half is not running. Check the terminal for a crash, or start it on
its own with `npm run dev:server` to see the error message.

**Changes to a file do nothing**
Make sure you saved the file, and make sure the project lives under `~/` and
not under `/mnt/c/`. File watching is unreliable on the Windows drive.

**`npm install` fails with permission errors**
Do not use `sudo npm install`. If you have already done so, delete the folder
and try again without `sudo`:

```bash
rm -rf node_modules client/node_modules server/node_modules
npm install
```

**You want a totally clean start**

```bash
rm -rf node_modules client/node_modules server/node_modules package-lock.json
npm install
```

---

## Working on a ticket

1. Read the ticket you have been assigned.
2. Reproduce it in the browser first. Do not start editing until you have seen
   the wrong behaviour with your own eyes.
3. Find the code. The ticket tells you which page or feature is involved; use
   the folder table above to guess the file, or search the project:
   ```bash
   grep -rn "Add to cart" client/src
   ```
4. Make the smallest change that fixes it.
5. Check it in the browser, then run `npm run typecheck` to be sure you did not
   break the types.
6. Open your browser's developer tools (`F12`) and look at the **Console** tab.
   React prints warnings there that often point straight at a bug.

Good luck, and remember: the fastest way to find a bug is to read the code that
runs *just before* the thing that looks wrong.
