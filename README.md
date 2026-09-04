# 🌐 Vesktop (DoH Fork) - Discord Client with DNS over HTTPS

> A high-performance, privacy-focused Discord client based on **Vesktop** and **Vencord**, featuring native **DNS over HTTPS (DoH)** support to bypass DNS-level censorship, prevent spoofing, and improve connectivity on restricted networks.

---

## ✨ About

**Vesktop** is a custom Discord desktop app that is significantly lighter and faster than the official client. It comes with [Vencord](https://vencord.dev/) pre-installed and offers native Wayland screen-sharing with audio on Linux.

This fork extends Vesktop by adding **DNS over HTTPS (DoH)** support directly into the app's network stack. Unlike standard DNS, which sends queries in plain text, DoH encrypts your DNS requests over HTTPS. This shields your domain lookups from ISPs and anything else that blocks or poisons DNS requests.

---

## 🚀 Key Features

| Feature | Description |
|---------|-------------|
| 🛡️ **DNS over HTTPS (DoH)** | Encrypts DNS queries to prevent ISP snooping and DNS hijacking. |
| 🌍 **Custom DoH Routing** | Point Vesktop to any custom DoH server (including SNI proxies). |
| 🧩 **Vencord Integration** | Full access to Vencord's plugins, themes, and tweaks out of the box. |
| 🐧 **Linux Optimized** | Native Wayland support, audio screen-sharing, and better performance. |
| ⚡ **Lightweight** | Stripped of Discord's bloatware and telemetry for a snappier experience. |

---

## 🌐 How It Works

### ❌ Normal DNS (Vulnerable)
Normally, Discord relies on your operating system's DNS resolver. These queries are sent in **plain text**, meaning your ISP or network admin can see every domain you look up and easily block them.

```text
Vesktop App
    │
    ▼ (Plain Text DNS Query)
System DNS / ISP
    │
    ▼ (Blocked or Spoofed IP)
Connection Fails ❌
```

### ✅ DNS over HTTPS (Secure & Unrestricted)
With DoH enabled, Vesktop intercepts DNS requests and sends them through an **encrypted HTTPS tunnel** directly to your chosen DoH provider. The ISP only sees encrypted traffic to the DoH server and cannot block the Discord domain lookup.

```text
Vesktop App
    │
    ▼ (Encrypted HTTPS Request)
DoH Server (e.g., Cloudflare, Google, or Custom DoH)
    │
    ▼ (Returns Real Discord IP)
Direct Connection to Discord ✅
```

---

## 🛰️ SmartSNI & Restricted Networks (e.g., Iran)

In heavily restricted networks (such as in Iran), Discord is often blocked at the DNS or SNI level. This fork is designed to work seamlessly with custom DoH servers that provide **Smart DNS routing** and **SNI Proxying**.

**Example Custom DoH Server:**
```text
https://newipe.qd.je/dns-query
```
> **⚠️ NOTE:** This specific server is optimized for Iranian networks and utilizes an SNI Proxy to route Discord traffic. It may not work outside of Iran.

**How the Custom Proxy Works:**
1. Vesktop asks `newipe.qd.je` for Discord's IP over encrypted HTTPS.
2. The DoH server returns the IP address of an **SNI Proxy** instead of Discord's actual IP.
3. Vesktop connects to the SNI Proxy. The proxy reads the TLS SNI header and securely forwards the connection to Discord's real servers, bypassing local network filters.

---

## 📥 Download & Installation

Pre-built binaries are available for all major platforms.

👉 **[Download the Latest Release Here](https://github.com/Newipe/Vesktop/releases)**

*Available for:*
- ⊞ **Windows** (`.exe`, `.msi`)
- 🍎 **macOS** (`.dmg` / `.zip`)
- 🐧 **Linux** (`.AppImage`, `.deb`, `.rpm`, `.pacman`)

*(Note: On macOS, since this is an unsigned fork, you may need to Right-Click -> Open the app, or allow it in System Settings > Privacy & Security).*

---

## ⚙️ How to Enable DoH

The predefined DoH providers are loaded from [`resolvers.json`](resolvers.json) on startup. The app keeps the built-in provider list when the file cannot be reached, so updating that file on GitHub changes the provider list without requiring a Vesktop release.

### Method 1: First Launch & In-App Settings (Recommended)
1. **On First Launch:** You will be greeted with a setup screen. Select your preferred DoH provider from the dropdown (or choose "Custom") and click **Submit**.
2. **In-App Settings:** 
   - Open Vesktop and log in.
   - Click the **Gear Icon (User Settings)** in the bottom left corner.
   - Scroll down the left sidebar to the **Vesktop** section.
   - Find the **DNS over HTTPS (DoH)** setting.
   - Choose a predefined provider (Cloudflare, Google, Quad9, OpenDNS, etc.) or select **Custom** to paste your own DoH server URL.
   - The setting saves automatically. Restart Vesktop to ensure all network sockets use the new resolver.

### Method 2: Manual Configuration (If you can't access settings)
If Discord is completely blocked and you cannot reach the settings menu, you can edit the configuration file directly.

1. **Completely close Vesktop.**
2. **Locate your settings file:**
   - **Windows:** `%appdata%\Vesktop\settings.json`
   - **Linux:** `~/.config/Vesktop/settings.json`
   - **macOS:** `~/Library/Application Support/Vesktop/settings.json`
3. **Open `settings.json` in a text editor and add/modify these lines:**
   ```json
   {
     "enableDoh": true,
     "dohUrl": "https://newipe.qd.je/dns-query"
   }
   ```
4. **Save the file and launch Vesktop.**

---

## 🔧 Recommended DoH Servers

You can use any standard RFC 8484 compliant DoH server.

### 🌍 Global Providers (Privacy & Anti-Spoofing)
| Provider | URL |
|----------|-----|
| **Cloudflare** | `https://cloudflare-dns.com/dns-query` |
| **Google** | `https://dns.google/dns-query` |
| **Quad9** (Malware Blocking) | `https://dns.quad9.net/dns-query` |
| **OpenDNS** | `https://doh.opendns.com/dns-query` |

### 🛰️ Region-Specific (Bypass Censorship)
| Provider | URL | Notes |
|----------|-----|-------|
| **Newipe DoH** | `https://newipe.qd.je/dns-query` | Iran only (Routes via SNI Proxy) |

---

## ❓ FAQ

**Does DoH encrypt my Discord messages and calls?**
No. DoH *only* encrypts the initial DNS lookup (finding the IP address). Your actual Discord messages, voice calls, and data are already encrypted by Discord's standard TLS/HTTPS connections.

**Does this guarantee I can access Discord if it's blocked?**
It depends on *how* your ISP blocks Discord. If they block it via DNS poisoning or standard SNI filtering, DoH + SNI Proxying will likely bypass it. If they block the DoH server or SNI Proxy's IP addresses entirely, DoH will not help.

**Can I use my own self-hosted DoH server?**
Yes! As long as your server supports the standard DoH protocol (`application/dns-message`), Vesktop can use it.

**Why use this instead of just setting DoH in my OS or Router?**
Setting it in Vesktop ensures that *only* Discord traffic uses the custom routing/SNI proxy, while the rest of your computer's traffic uses your normal DNS. It also bypasses OS-level restrictions that might prevent you from changing DNS settings.

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Discord won't load after enabling DoH** | Your DoH URL might be incorrect, or the server is down. Clear the URL in settings or edit `settings.json` manually to disable it. |
| **"Invalid URL" error** | Ensure your URL starts with `https://` and ends with the proper query path (usually `/dns-query`). |
| **Stuck on "Connecting..."** | The DoH server might be returning an IP that your ISP is blocking at the IP level. Try a different DoH provider. |
| **macOS "App is damaged" error** | This is a standard Gatekeeper warning for unsigned apps. Right-click the app and select **Open**, or run `xattr -cr /Applications/Vesktop.app` in Terminal. |

---

## 🛠️ Building from Source

If you want to build this fork yourself, you will need Git, Node.js, and pnpm (`npm install --global pnpm`).

```sh
git clone https://github.com/Newipe/Vesktop
cd Vesktop

# Install Dependencies
pnpm i

# Either run it without packaging
pnpm start

# Or package (will build packages for your OS in the dist/ folder)
pnpm package

# Or only build the Linux Pacman package
pnpm package --linux pacman

# Or package to a directory only
pnpm package:dir
```

*(Note: On Linux, Vesktop uses a small C++ helper library called `LibVesktop` to emit D-Bus events. Prebuilt binaries are used by default, but you can build it from source using `pnpm buildLibVesktop` if you have the necessary C++ build dependencies installed).*

---

## ❤️ Credits & Acknowledgments

- **[Vesktop](https://github.com/Vencord/Vesktop)** - The incredible base client and Linux optimizations.
- **[Vencord](https://vencord.dev/)** - The best Discord client mod.
- **[Newipe](https://github.com/Newipe)** - Creator of this fork; provides the custom SNI Proxy DoH (https://newipe.qd.je/dns-query) and maintains the DoH integration.

---

## 📄 License

This fork inherits the **GPL-3.0-or-later** license from the original Vesktop project. See the `LICENSE` file for details.