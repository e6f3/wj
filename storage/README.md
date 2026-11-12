# Lightspeed Systems Filter Extension: The Complete Guide

## Table of Contents

1.  [Introduction to Lightspeed Filter](#1-introduction-to-lightspeed-filter)
2.  [Core Architecture and Components](#2-core-architecture-and-components)
    - [SmartAgent](#21-smartagent)
    - [SmartShield](#22-smartshield)
    - [Chrome Extension (LSChromeFilter)](#23-chrome-extension-lschromefilter)
3.  [Key Features and Capabilities](#3-key-features-and-capabilities)
4.  [Deployment and Installation Guide](#4-deployment-and-installation-guide)
    - [Chromebooks (Chrome Extension)](#41-chromebooks-chrome-extension)
    - [macOS (SmartAgent)](#42-macos-smartagent)
    - [Windows (User Agent)](#43-windows-user-agent)
    - [iOS (SmartAgent)](#44-ios-smartagent)
    - [BYOD & IoT (SmartShield)](#45-byod--iot-smartshield)
5.  [Policy Configuration and Best Practices](#5-policy-configuration-and-best-practices)
6.  [Reporting and Activity Logs](#6-reporting-and-activity-logs)
7.  [Troubleshooting Common Issues](#7-troubleshooting-common-issues)
8.  [Privacy, Compliance, and Security](#8-privacy-compliance-and-security)
9.  [What's New: 2026 Roadmap and AI Features](#9-whats-new-2026-roadmap-and-ai-features)
10. [Frequently Asked Questions (FAQ)](#10-frequently-asked-questions-faq)
11. [Appendix: Useful Commands and References](#11-appendix-useful-commands-and-references)

---

## 1. Introduction to Lightspeed Filter

Lightspeed Filter is a cloud-hosted, device-level content filtering solution designed specifically for educational environments. Its primary mission is to protect students from harmful online content—regardless of their physical learning location—while offering the flexibility and control needed to promote learning, exploration, productivity, and privacy.

Unlike traditional network-based filters that rely on a single chokepoint, Lightspeed Filter uses patented, AI-powered agents that operate directly on the device. This cloud-based architecture allows the filter to scale seamlessly, providing consistent coverage and reporting across a wide variety of operating systems, devices, and browsers. The system is engineered to be CIPA-compliant and provides enhanced functionality such as blocking popular bypass software, supporting mobile device filtering outside of the district network, and generating forensic-level reports.

The extension-based approach is particularly crucial for Chromebooks, where a lightweight Chrome extension delivers browser-level filtering with full decrypted visibility, silent installation through the Google Admin console, and real-time reporting synced by Organizational Unit (OU) or group.

---

## 2. Core Architecture and Components

Lightspeed Filter is not a single product but a suite of components that work in concert to provide defense-in-depth filtering.

### 2.1 SmartAgent

The **SmartAgent** is a small, on-device application installed on managed endpoints (Windows, macOS, iOS). It performs system-level filtering and SSL decryption without the need to manage PAC files, proxies, or certificates manually. Because the agent lives on the device, enforcement remains intact even when the device is off the school network or during internet outages. On macOS, the agent is implemented as a system extension (Team ID: `ZAGTUU2342`), and a configuration profile is required to pre-approve the network extension and install the root certificate before the agent functions correctly.

### 2.2 SmartShield

**SmartShield** is a DNS-based network filtering layer designed for unmanaged or guest devices such as student phones, BYOD laptops, and IoT classroom tools. It identifies internal IPs and users for audit and policy mapping and supports flexible deployment by school, building, or subnet. Recent updates have simplified SmartShield deployment by introducing pre-built virtual machine images and an installation wizard with plain-language prompts.

### 2.3 Chrome Extension (LSChromeFilter)

For Chromebooks, the filtering is delivered through a Chrome extension known as **LSChromeFilter**. This is a user-level extension that must be force-installed via the Google Admin Console onto Organizational Units containing users (not devices). Once installed, the extension silently filters internet traffic even when the user is outside the school network. If a user attempts to access the internet outside the network without a School ID, they will be prompted to enter one; after successful entry, the correct filtering policy is applied automatically on any Chrome device. The extension also supports Single Sign-On (SSO) for automatic, seamless policy application.

---

## 3. Key Features and Capabilities

Lightspeed Filter is built on a comprehensive K-12 content database that categorizes millions of domains daily using zero-day support and AI-driven analysis. Key features include:

- **Live Intelligence & Bypass Detection:** The system analyzes what is executing in the browser—not just URLs—including JavaScript behavior, tunneling methods, and proxy libraries, to stop bypass attempts as they happen.
- **Phishing and Ransomware Protection:** Blocks risky domains, proxies, and malicious traffic using a Zero Trust-aligned architecture backed by threat feed integration.
- **AI Tool Management:** Administrators can manage access by AI type, configure exceptions with granular categorization, and surface AI-related searches in activity reports.
- **Multi-OS Coverage:** Consistent policy enforcement and visibility on Chrome, Windows, Mac, iOS, BYOD, and IoT—both on and off the network.
- **Social Media & Video Controls:** Set access by platform (YouTube, TikTok, Discord, Instagram), user, group, or schedule. Granular controls for YouTube features like Shorts, comments, and sidebars are also available.
- **Audit and Compliance Reporting:** Export user-level logs of searches, visited websites, and blocked attempts, structured for audits, investigations, and compliance requirements.

---

## 4. Deployment and Installation Guide

Deployment methods vary by operating system. The following sections outline the standard procedures for each platform.

### 4.1 Chromebooks (Chrome Extension)

The Chromebook deployment relies on force-installing the LSChromeFilter extension via the Google Admin Console.

**Prerequisites:**
- A Lightspeed Rocket running version 2.9.2 or later.
- Incognito mode (private browsing) must be disabled.
- Chromebooks must be forced to allow sign-in from your domain only.

**Deployment Steps:**
1.  Log in to the **Google Admin Console**.
2.  Navigate to **Device Management > Chrome Management > User Settings**.
3.  Select the **Organizational Unit (OU)** to which the extension should apply. *Note: LSChromeFilter is a user extension, so it must be applied to an OU containing users, not devices*.
4.  Scroll down to **Force-installed Apps and Extensions** and click **Manage force-installed apps**.
5.  Choose **Chrome Web Store** from the left panel, type `LSChromeFilter` in the search box, and press Enter.
6.  Click the **Add** link next to LSChromeFilter.
7.  Click **Save**. The extension will now be installed silently for all users in the selected OU, regardless of which Chromebook they use.

Upon first use outside the school network, users will be prompted for a **School ID**. This ID is found in the Lightspeed Rocket interface under **Web Filter > Mobile Devices**. After entering the ID once, the user will not be prompted again on any Chrome device.

### 4.2 macOS (SmartAgent)

macOS deployment requires a configuration profile to be installed *before* the SmartAgent package. This profile pre-approves the system extension and installs the root certificate, preventing user prompts.

**Using an MDM (e.g., SimpleMDM):**
1.  **Download the Certificate:** In the Lightspeed console, go to **Settings > Certificates** and download the public certificate (`*_cert.cer`). Base64-encode it and paste it into the certificate section of a custom configuration profile (e.g., `Lightspeed SmartAgent profile.mobileconfig`).
2.  **Create the Profile:** The profile must include:
    - Lightspeed's root certificate.
    - Approval for the system extension (Team ID: `ZAGTUU2342`).
    - Approval for the content filter.
3.  **Download the Agent:** Download `SmartAgent.pkg` from the Lightspeed console under **Settings > Software Setup > Lightspeed Filter > Mac tab**.
4.  **Deploy via MDM:** Assign the profile and the package to your device group. A "Before Install" script can be used to ensure the profile is present before the agent installs:
    ```bash
    #!/bin/bash
    /usr/bin/profiles show -type configuration | grep -q "org.bsd.lightspeed.smartagent" || exit 1
    ```
    

**Manual Installation:** If using a self-service portal (e.g., Self Service+), users can simply find "Lightspeed Relay macOS Agent" and click Install. The computer will restart.

### 4.3 Windows (User Agent)

Windows deployment can be performed manually or via enterprise tools.

**Manual / Company Portal:**
- If the **Company Portal** is installed, open it, search for "Lightspeed", and click **Install**.
- If Company Portal is not available, IT staff can install the program remotely after obtaining the device's IP address.

**Group Policy (GPO) Deployment:**
Lightspeed provides MSI packages that can be deployed via Group Policy Objects (GPO) or third-party utilities. The deployment process involves obtaining the Lightspeed User Agent files, creating a GPO, and linking it to the appropriate Organizational Units.

### 4.4 iOS (SmartAgent)

On iOS, the SmartAgent is deployed as an app via Mobile Device Management (MDM). It provides system-level filtering that protects all apps and browsers, with full user-specific policies and search/YouTube visibility when cloud-based decryption is enabled. Enforcement remains active off-network and during outages.

### 4.5 BYOD & IoT (SmartShield)

SmartShield protects unmanaged devices via DNS filtering. It is deployed at the network level and can authenticate users (including via RADIUS) for in-depth reporting. It identifies internal IPs and users for audit and policy mapping and can be deployed flexibly by school, building, or subnet.

---

## 5. Policy Configuration and Best Practices

Lightspeed Filter's policy engine allows for granular control over internet access. The following are recommended practices for effective configuration.

**Core Recommended Settings for Student Groups:**
1.  **Enable Force Safe Search:** This setting is found under **Internet Access > Default Rules** and ensures that search engines return filtered results.
2.  **Filter Google Image Search Thumbnails:** This prevents explicit images from appearing in image search results.
3.  **Block Unknown Users:** Ensure that users who cannot be identified by the filter are denied access.

**Preventing Double-Filtering:**
On non-Chromebook devices (Windows, Mac) that already have the SmartAgent installed, you should enable the setting: **"Disable Lightspeed Filter Agent for Chrome browser extension on non-Chromebook devices"** . This prevents the browser extension from conflicting with the system-level agent.

**Policy Management (Policies 2.0):**
The newer **Policies 2.0** interface offers a more streamlined and flexible approach. It introduces drag-and-drop priority ordering, centralized management, and enhanced list management. All new AI-powered features (such as the BOB assistant and image blurring) require Policies 2.0, so migration is strongly recommended.

---

## 6. Reporting and Activity Logs

Lightspeed Filter includes a robust reporting suite that provides visibility into user activity. The **Reports** section of the dashboard offers a dropdown menu with several report types:

- **Blocked:** Shows all denied access attempts.
- **Flagged:** Displays activity that triggered an alert (e.g., suspicious searches).
- **Overridden:** Logs instances where a user bypassed a block with credentials.
- **Searches:** Aggregates search queries made by users.
- **Videos:** Tracks YouTube and other video platform activity.
- **Web Activity Log:** A detailed log of all visited URLs.
- **Online Activity:** A high-level overview of online behavior.

**Real-Time Reporting:** The **Live User Web Activity** feature brings real-time reporting to the cloud-based filter, showing data such as block reasons and SSL exclusion indicators as they happen.

**Parent Portal:** Districts can optionally enable the **Lightspeed Parent Portal**, which provides parents with weekly email reports summarizing their child's online activity, including allowed and blocked sites.

---

## 7. Troubleshooting Common Issues

**"I can't access a site that I need for schoolwork."**
Lightspeed Filter is controlled by your school or district IT department. If a legitimate educational site is blocked, the correct procedure is to contact your school's IT helpdesk or a teacher, provide the exact URL, and request that the site be reviewed and added to the allowed list. There is no supported method to bypass or disable the filter yourself.

**"The filter is installed on my personal device and I didn't expect it."**
If Lightspeed was installed on a personal device, it is likely because a school account or organization is connected. Check **Settings > Accounts > Access work or school** (on Windows) to see if a school connection exists. Do not disconnect it without first contacting the school IT team, as doing so may remove access to school apps and resources.

**macOS: "Your connection is not private" error.**
This typically indicates an issue with the Lightspeed root certificate. Open the **Keychain Access** app and look for the Lightspeed Filter Agent certificate. If it has expired, it may need to be renewed or the configuration profile re-deployed.

**Intermittent "Oops Request Blocked due to filtering error" pages.**
This can occur due to temporary cloud infrastructure issues. Lightspeed status updates often confirm when such issues are resolved. If the problem persists, check the Lightspeed status page or contact support.

**Extension not appearing on Chromebooks.**
Verify that the LSChromeFilter extension was added as a **force-installed app** under **User Settings** (not Device Settings) in the Google Admin Console, and that the correct Organizational Unit was selected.

---

## 8. Privacy, Compliance, and Security

Lightspeed Systems is designed with student data privacy as a core principle. The platform complies with major regulations, including **FERPA, CCPA, GDPR, and COPPA**, as well as social media platform agreements.

Key privacy protections include:
- **Data Minimization:** Automated alerts (from Lightspeed Alert) are sent only when a risk is identified, only to designated personnel, and with only the minimum information necessary.
- **AI and Human Review:** AI is used to remove human bias in content scanning, while diverse governance and review teams work to eliminate AI bias.
- **Dedicated Privacy Team:** A dedicated team of data scientists, database administrators, and privacy specialists ensures ongoing compliance and security. Lightspeed is an early signer of the **Student Privacy Pledge**.

---

## 9. What's New: 2026 Roadmap and AI Features

Lightspeed Filter continues to evolve rapidly, with a strong focus on artificial intelligence and simplified administration. Key updates for 2026 include:

- **BOB 3.0 (AI Assistant):** An AI assistant that helps administrators interact with policies, get quick answers, and receive proactive insights about their environment.
- **AI Image Blurring:** Automatically blurs indecent images, providing an extra layer of safety. This feature is configurable by category and fully integrated into Policies 2.0.
- **Policies 2.0:** A major leap forward in policy management, featuring drag-and-drop priority ordering, centralized management, and enhanced list management. **All new AI features require Policies 2.0.**
- **Security Insights Dashboard:** Provides real-time visibility into security trends, malware, and proxy attempts.
- **Telemetry Reporting:** Monitors device health and status across all Lightspeed products for a high-level overview.
- **Simplified SmartShield Deployment:** Pre-built VM images and a plain-language installation wizard make protecting BYOD and IoT devices easier than ever.

---

## 10. Frequently Asked Questions (FAQ)

**Q: How is Lightspeed Filter different from other school web content filters?**
A: Lightspeed Filter uses a hybrid approach: a proprietary SmartAgent filters directly on managed devices (Mac, Windows, iOS), while SmartShield provides DNS-based protection for BYOD and IoT traffic. This eliminates the need to manage proxies or PAC files on Mac and Windows, offers seamless extension-based filtering on Chromebooks, and provides flexible deployment options for iOS. It delivers consistent policy enforcement, SSL visibility, and detailed reporting across every OS.

**Q: Does the filter work when students are learning from home?**
A: Yes. Because filtering is enforced at the device level (via SmartAgent or the Chrome extension), policies remain active even when the device is off the school network or during an internet outage.

**Q: Can I use the Chrome extension and the SmartAgent on the same device?**
A: You can, but it is not recommended as it may cause double-filtering. Lightspeed provides a setting to disable the Chrome extension on non-Chromebook devices that already have the SmartAgent installed.

**Q: Is Lightspeed Filter CIPA compliant?**
A: Yes, Lightspeed Filter is built to support CIPA (Children's Internet Protection Act) compliance, providing the necessary web filtering and monitoring capabilities required for E-Rate funding.

---

## 11. Appendix: Useful Commands and References

**macOS Verification Command:**
To verify that the Lightspeed configuration profile is installed on a Mac:
```bash
/usr/bin/profiles show -type configuration | grep "org.bsd.lightspeed.smartagent"
```


**Key URLs:**
- **Chrome Extension ID:** `adkcpkpghahmbopkjchobieckeoaoeem`
- **Lightspeed Systems Trust Center:** `https://www.lightspeedsystems.com/about/trust/`

**Certificate Encoding Command (macOS):**
```bash
base64 -i *_cert.cer
```


**Important File Paths:**
- **macOS Agent Application:** `/Applications/Lightspeed Agent.app`
- **macOS Profile Identifier:** `org.bsd.lightspeed.smartagent`

---
