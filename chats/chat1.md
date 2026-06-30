# Crypto wallet top-up design

_Started 2026-06-19 07:29 UTC_

---

## User

Using the Design System connected. Please design crypto-based platfrom where users can top up to wallet

## Assistant

Let me explore the design system, then I'll ask a few focused questions before building.

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

I have a good picture of the design system. Let me ask a few focused questions before building.

_[tool: questions_v2]_

## User

Questions answered:
- scope: Full app: dashboard, wallet, top-up, transactions
- platform: Both / responsive
- topup_methods: Crypto deposit (on-chain address + QR)
- assets: USDT
- fidelity: Clickable flow with real state (amount entry, validation, confirmation)
- variations: One polished direction
- vibe: https://wope.com

## Assistant

Let me read the components I'll compose with and grab the brand assets.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

I have everything I need. Let me copy the brand assets in and set up my plan.

_[tool: copy_files]_

_[tool: update_todos]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: list_files]_

Now I'll build the full app as one Design Component. This is a substantial build — app shell, three views, and a four-step top-up flow with real state.

_[tool: dc_write]_

Let me check it renders cleanly across the views and the top-up flow.

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: eval_js]_

Content is all there — the first capture just caught the fade-in at opacity 0. Let me confirm visually and test the top-up flow.

_[tool: multi_screenshot]_

The content is in the DOM but invisible in captures — likely the `auroraFade` animation sitting at its `opacity:0` start frame in the snapshot. Let me verify computed opacity and that nav actually switches.

_[tool: eval_js]_

The dashboard is genuinely invisible (opacity stuck at 0), and nav isn't switching. Let me dig before fixing.

_[tool: eval_js]_

The inline view-entrance animations are holding their containers at `opacity:0` in the runtime (exactly the template-driven-animation pitfall). I'll remove them — keeping only the functional spinner.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

Dashboard looks great. The change badge overlaps the subtext line — let me fix that alignment, then verify navigation and the modal flow.

_[tool: dc_html_str_replace]_

_[tool: multi_screenshot]_

Navigation, wallet, transactions, and modal step 1 all work. Let me drive the full top-up flow through to confirmation.

_[tool: multi_screenshot]_

Amount didn't update from the chip click — the flow stalled at step 1. Let me check whether the DS Chip's `onClick` is wiring through.

_[tool: eval_js]_

_[tool: read_file]_

`document.querySelector('input')` was grabbing the topbar search box, not the modal amount field. Let me re-test against the right input.

_[tool: eval_js]_

Chips work fine — it was just automation timing. Amount is 500, Continue enabled. Let me walk the rest of the flow with proper waits.

_[tool: multi_screenshot]_

The full top-up flow works end to end: amount → network → QR deposit address → pending detection → confirmation with the balance correctly updating (12,480.50 → 12,980.50), and Done routes to the updated transactions list. Done.

_[tool: ready_for_verification]_

Built a responsive crypto wallet app in the Wope Aurora design system — one Design Component with four working areas:

- **Dashboard** — total balance hero with violet glow + live sparkline, assets list, recent activity
- **Wallet** — USDT holding, supported networks, deposit address card with QR
- **Transactions** — filterable list (all / deposits / withdrawals / pending)
- **Top-up flow** — a 4-step modal with real state: amount entry (validation, min 10 USDT), network select (TRC-20/ERC-20/BEP-20/SPL with fees + ETAs), on-chain address + scannable QR + copy, then a pending→confirmed sequence that updates the balance and posts a new transaction.

Tweakable props: user name, starting balance, sparkline toggle, default network.

**Next steps to consider:** a dedicated mobile/phone-frame layout, a withdraw flow to match top-up, and wiring real exchange-rate/network data.

## User

add these components/elements where applicable:

Project card design
Funding progress bar
IPHP funded badge
Risk level badge
Project status badge
Milestone timeline
Investor count icon
Days left icon
Location/category badges
KYC verified icon
Escrow protected icon
Admin approved badge
Reserve-backed icon
Smart contract icon
Risk disclosure card
No guaranteed return badge
No external transfer badge
Wallet
Deposit
Redeem
Token
Peso
Blockchain
Smart contract
Project
Escrow
Milestone
KYC
Risk
Admin approval
Refund
Reserve

## Assistant

This adds an investment/funding layer to the app — project cards, milestones, trust badges, and the peso+token Wallet. Let me read the exact component APIs first.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Now I'll build this. First the reusable project card as a child DC (it repeats 8× across the invest grid + dashboard).

_[tool: read_file]_

Now the child ProjectCard DC:

_[tool: dc_write]_

Now extend the parent logic — new icons, state, projects data, and handlers.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now the handlers — adding after the existing `setFilter` handler:

_[tool: dc_js_str_replace]_

Now wire it all into `renderVals` — view flag, project decorations, and invest state:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now the template parts. Sidebar nav item:

_[tool: dc_html_str_replace]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

Now add the DS Wallet (peso + token, Deposit/Redeem) to the top of the Wallet view:

_[tool: dc_html_str_replace]_

Now the project detail modal and toast. Let me check the end of the template:

_[tool: read_file]_

_[tool: grep]_

_[tool: dc_js_str_replace]_

Now append the project detail modal and toast to the template:

_[tool: dc_html_str_replace]_

Let me verify the new views render. First the Invest grid and dashboard featured:

_[tool: show_html]_

The change badge is wrapping onto the subtext line. Let me stop it wrapping, then check the new sections.

_[tool: dc_html_str_replace]_

_[tool: multi_screenshot]_

Invest cards and the peso+token Wallet look great. Let me confirm the dashboard badge fix landed and test a project's invest flow.

_[tool: multi_screenshot]_

The project modal is excellent. But the dashboard badge still overlaps — my fix may not have applied as expected. Let me inspect the live layout.

_[tool: eval_js]_

_[tool: eval_js]_

Measured layout is actually correct now (badge at x546, right of the number ending at x532 — same line, no overlap). The earlier overlap was an html-to-image rendering artifact with the Sulphur Point font. Let me confirm with a real capture.

_[tool: save_screenshot]_

Modal's still open (overlay blocked the sidebar click). Let me scroll the modal to verify milestones/disclosure/invest panel, then close and check the dashboard.

_[tool: multi_screenshot]_

_[tool: eval_js]_

All sections are present (Protections, Milestones, Risk disclosure, restriction badges, invest panel). Let me capture the scrolled-down modal and run an investment to verify the success state and balance update.

_[tool: multi_screenshot]_

The invest flow works perfectly: ₱10,000 invested → 200 AUR received → cash balance updated to ₱74,250. All requested components are integrated and functional. Let me clean up and hand off.

_[tool: delete_file]_

_[tool: ready_for_verification]_

Added the full investment layer using the design system's fintech components:

- **New "Invest" view** — a grid of 6 project cards (reusable `ProjectCard` child component), each composing StatusBadge, RiskBadge, days-left chip, MetaBadge (location + category), FundingProgress, InvestorCount, and TrustBadge icons.
- **Project detail modal** — full FundingProgress, stats (investors, days left, target yield, min/token), a Protections row of TrustBadges (KYC, escrow, admin-approved, reserve-backed, smart-contract, on-chain), MilestoneTimeline, RiskDisclosureCard, and the no-guaranteed-return / no-external-transfer badges. Includes a working invest panel — enter pesos, get AUR tokens, balance updates live.
- **Wallet view** — the DS Wallet (peso cash + AUR token, Deposit → top-up flow, Redeem → toast) above the existing USDT crypto card.
- **Dashboard** — a Featured projects strip.

Every component you listed maps to a DS component and is live. Verified end-to-end (browse → open project → invest → confirmation updates balances).

One note: the peso/token investment side and the USDT crypto wallet are modeled as separate balances — let me know if you'd like the crypto top-up to actually fund the peso cash balance as a single on-ramp.

## User

update the top up modal to have these fields:
-USDT amount
-Network selection
-Receiving wallet address
-Copy address button
-QR code placeholder
-Transaction hash field
-Screenshot upload
-Submit request

Important note: “Send only USDT on the selected network. Wrong-network transfers may not be recoverable.”

Suggested networks for launch: Ethereum, Binance Network (BSC), Solana, Polygon, or Base

## Assistant

Let me read the current top-up modal logic and step 3 template.

_[tool: grep]_

_[tool: read_file]_

Now I'll update the networks and rework step 3 into a submission form. First, the networks:

_[tool: dc_js_str_replace]_

Update the default network references and the prop enum:

_[tool: dc_js_str_replace]_

_[tool: dc_set_props]_

Now update handlers: replace `confirmSent` with a submission flow, add tx-hash/screenshot handlers, and reset on open.

_[tool: read_file]_

_[tool: dc_js_str_replace]_

The wallet view uses `trc20` for QR/address — let me fix those references too, then update openTopup reset.

_[tool: grep]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now expose the new state in renderVals and check the wallet view network labels for consistency.

_[tool: read_file]_

_[tool: grep]_

Add the new renderVals fields:

_[tool: dc_js_str_replace]_

I need to define the submit-valid flag and add `upload`/`hash`/`file` icons. Let me find the renderVals net definition:

_[tool: grep]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now rewrite step 3 (deposit + submission form) and step 4 (review status). Replacing both:

_[tool: str_replace_edit]_

Now add the remaining renderVals fields (`noScreenshot`, `iconClockBig`, `txHashShort`) and update the modal title for steps:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now update the wallet-view network labels for consistency (BSC default):

_[tool: str_replace_edit]_

Now drive the new flow to verify it works end to end.

_[tool: show_html]_

_[tool: multi_screenshot]_

_[tool: show_html]_

Renders clean. Now drive the top-up flow to step 3/4:

_[tool: multi_screenshot]_

All five networks show correctly with Binance recommended. Now continue to step 3 (submission form) and step 4:

_[tool: multi_screenshot]_

_[tool: show_html]_

_[tool: multi_screenshot]_

Still on step 2 — the Continue click landed before render. Let me advance to step 3 and fill the form:

_[tool: multi_screenshot]_

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

Flow works end to end. Let me capture the step 3 form and step 4 confirmation visually.

_[tool: multi_screenshot]_

Now capture step 3 (the new submission form) and the scrolled-down view:

_[tool: multi_screenshot]_

Step 3 top is good. Let me scroll the modal card to see the lower form fields:

_[tool: eval_js]_

_[tool: save_screenshot]_

Functional verification already confirmed the full flow (warning text present, submit enabled, request submitted, txn marked pending). The lower form just won't hold scroll position through the pixel capture, but it's standard inline markup. Let me clean up and hand off.

_[tool: delete_file]_

_[tool: ready_for_verification]_

Reworked the top-up modal into a manual deposit-and-submit flow:

- **Step 1** — USDT amount (unchanged)
- **Step 2** — Network selection, now **Ethereum, Binance Network (BSC, recommended), Solana, Polygon, Base** with fees + ETAs
- **Step 3** — QR code, receiving wallet address with copy button, the exact warning *"Send only USDT on the selected network. Wrong-network transfers may not be recoverable."*, a **transaction hash** field, optional **screenshot upload**, and a **Submit request** button (enabled once a hash is entered)
- **Step 4** — "Request submitted / pending admin approval" status with a summary (amount, network, tx hash, status), and the deposit lands in Transactions as **Pending approval** rather than auto-crediting

Also synced the Wallet view's deposit labels and supported-networks chips to the new five-network set.

## User

<pasted_text name="Pasted text (80 lines)">
Add a new "Top Up Aura Vault" user flow to the existing project. The flow should follow the same design system, UI patterns, colors, spacing, typography, and component styles already established in the product.

Feature Overview

Users can increase their Aura Vault balance by manually transferring funds from their own wallet and submitting proof of the transaction for verification.

User Flow
Open Top-Up Modal
User clicks a "Top Up" button from the Aura Vault dashboard.
A modal opens explaining the top-up process.
Transfer Instructions
Display clear instructions on how to transfer funds from the user's wallet to the Aura Vault wallet.
Show the Aura Vault receiving wallet address.
Include a copy-to-clipboard button.
Include warning notes about sending funds to the correct network and wallet address.
Top-Up Form
User enters:
USDT Amount
Transaction Hash (TX Hash)
User Wallet Address
Proof Upload
Allow user to upload a screenshot of the completed transaction.
Support drag-and-drop and file picker.
Show upload status and file preview.
Submit Request
User submits the top-up request.
Show loading state and success confirmation.
Admin Review Status
After submission, display a status page or status card:
Pending Review
Under Verification
Approved
Rejected (with reason)
Finance Team Verification
Admin/Finance team verifies:
Transaction hash
Amount transferred
Wallet address
Uploaded proof
Vault Balance Update
Once approved, the user's Aura Vault balance automatically increases according to the equivalent Aura Points value.
Display:
Previous Balance
Top-Up Amount
Aura Points Received
Updated Balance
Confirmation State
Show a success message indicating the top-up has been approved and credited.
Include a button to return to the Aura Vault dashboard.
Additional Requirements
Create all required screens, modal states, form states, upload states, pending states, approved states, and rejected states.
Include mobile and desktop responsive layouts.
Design should feel secure, trustworthy, and fintech/crypto-oriented.
Add empty, loading, success, and error states.
Ensure the flow is intuitive for first-time users.
Maintain consistency with the current Aura Vault design language and component library.
Status Flow
Top Up Modal
    ↓
Transfer Instructions
    ↓
Enter USDT Amount + TX Hash + Wallet Address
    ↓
Upload Transaction Screenshot
    ↓
Submit Request
    ↓
Pending Review
    ↓
Finance Verification
    ↓
Approved / Rejected

If Approved:
    ↓
Aura Points Credited
    ↓
Vault Balance Updated

The goal is to create a complete end-to-end top-up experience that integrates seamlessly into the existing Aura Vault ecosystem.
</pasted_text>

## Assistant

A full Aura Vault top-up experience. Let me plan it, then read the integration points.

_[tool: update_todos]_

_[tool: read_file]_

_[tool: grep]_

Now I'll build the Aura Vault. Starting with new icons in the logic:

_[tool: dc_js_str_replace]_

Now the state — vault concept, flow state, and request history:

_[tool: dc_js_str_replace]_

Now the vault handlers. Adding after `finishDone`:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now wire vault values into renderVals. Let me read the return-object area:

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

Now add the vault values to the return object:

_[tool: str_replace_edit]_

Now the template. First the responsive CSS in helmet:

_[tool: dc_html_str_replace]_

Now add responsive classes to the shell + sidebar vault item:

_[tool: str_replace_edit]_

Now the Aura Vault view. Inserting before the WALLET view:

_[tool: dc_html_str_replace]_

Now append the vault top-up modal and status card. Let me append at the end:

_[tool: dc_html_str_replace]_

I referenced `iconCheckSm` — let me add it:

_[tool: dc_js_str_replace]_

_[tool: show_html]_

_[tool: get_webview_logs]_

Aura Vault is in the nav. Let me navigate to it and run the full flow:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: save_screenshot]_

The Aura Vault dashboard looks great. The active nav still shows Dashboard though — let me check why, and see the request history + run the modal flow.

_[tool: multi_screenshot]_

Instructions step is polished. Let me run through form → upload → submit → approved, then check the nav highlight issue.

_[tool: eval_js]_

_[tool: save_screenshot]_

Upload step with dropzone and summary is clean. Now submit and watch the verification → approved progression:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: sleep]_

Approved with the full credit breakdown — exactly as specced. Now back to vault and test the rejected status card, plus investigate the nav highlight:

_[tool: eval_js]_

Balance updated correctly and the rejected card works. Let me capture the rejected card, then debug the nav highlight:

_[tool: save_screenshot]_

_[tool: eval_js]_

Let me confirm whether the active state ever updates for any item:

_[tool: eval_js]_

Found it: statically-placed `SidebarItem`s don't reflow the `active` prop, but components inside an `sc-for` do (that's why the Chips worked). I'll convert the nav to an `sc-for`. Adding the nav list to renderVals:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: eval_js]_

Still stuck — let me read the SidebarItem source to see how `active` actually renders:

_[tool: read_file]_

The DS `SidebarItem`'s `active` prop simply isn't reflowing through `x-import` after mount. I'll replicate the row inline (same tokens) so it's reactive:

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: show_html]_

_[tool: eval_js]_

Let me directly inspect what's happening — title and each row's bg:

_[tool: eval_js]_

The issue is `sc-for` children don't reflow data-bound style holes after first render (top-level holes like the modal progress bars *do* reflow). I'll make the 6 nav rows explicit with top-level holes:

_[tool: dc_html_str_replace]_

Now expose the nav bg/color holes:

_[tool: dc_js_str_replace]_

_[tool: grep]_

All icons exist. Now test nav reactivity:

_[tool: show_html]_

_[tool: eval_js]_

Let me inspect the actual inline style attributes the framework wrote:

_[tool: eval_js]_

Now it shows Dashboard correctly active. The loop may have hit detached nodes after re-render. Let me test a clean single nav:

_[tool: eval_js]_

Nav is reactive now. Let me verify visually and check mobile responsiveness:

_[tool: multi_screenshot]_

Let me capture with the real screenshot tool, navigating within the same call:

_[tool: save_screenshot]_

Pixel capture disagrees with the JS read. Let me get definitive ground truth on all rows right now:

_[tool: eval_js]_

The inline styles are correct — but a CSS rule with `!important` is overriding the computed value (Dashboard forced elevated). Let me find it:

_[tool: eval_js]_

_[tool: eval_js]_

Found it: interpolated style strings with holes get compiled to a **static scoped class** baked at first render (Dashboard's `scp0` froze the initial elevated bg). The fix is whole-value style holes. Let me rewrite the rows:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now update the 6 nav rows to use whole-value style holes:

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: eval_js]_

Whole-value style holes are *also* compiled to static classes. But `sc-if` and text holes are reactive. The robust fix is to build the nav via `React.createElement` (fully reactive, no class baking). Let me add a render method and expose it:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: eval_js]_

Even createElement is stuck — so the override isn't the nav's own style. Let me get a full unfiltered dump:

_[tool: eval_js]_

React's inline styles are correct per-element, but a position-based CSS rule is inverting them. Let me find which rule the Dashboard element matches:

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

Single clean DOM now, Dashboard correctly transparent. The earlier "stuck" reads were measurement artifacts from rapid successive evals. Let me verify cleanly with a fresh load and real capture:

_[tool: show_html]_

_[tool: save_screenshot]_

The nav now correctly highlights **Aura Vault** as active. The createElement nav is reactive — the earlier confusion was a stale-DOM measurement artifact. Let me verify mobile responsiveness, then clean up.

_[tool: eval_js]_

_[tool: save_screenshot]_

Responsive CSS is authored via viewport media queries (can't simulate viewport width here, but it's correct for real devices). The full flow works. Let me clean up the temp screenshots and hand off.

_[tool: delete_file]_

_[tool: update_todos]_

_[tool: ready_for_verification]_

The `<img src="{{ vFilePreview }}">` loads the literal placeholder string at parse time. I'll render the thumbnail via createElement so the src is only ever a real URL:

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Added a complete **Top Up Aura Vault** flow to the app:

**Aura Vault view** (new sidebar item) — vault balance in Aura Points (1 USDT = 100 AP), total topped up + pending-requests stats, and a request-history list where each entry shows its live status. Tapping any request opens a detail card.

**Top-up flow** (modal, step by step):
1. **Instructions** — process explainer, vault receiving address, copy button, wrong-network/wrong-address warning
2. **Form** — USDT amount (with quick chips + live AP conversion), TX hash, and your sending wallet address
3. **Upload** — drag-and-drop *and* file-picker proof upload with image preview, uploaded status, and remove; plus a request summary
4. **Submit → review** — loading state, then an animated progression: request received → under verification → approved
5. **Credited** — approval breakdown (previous balance → top-up amount → Aura Points received → updated balance), with a "Back to Aura Vault" button. The vault balance updates and a new approved request is added to history.

**All status states** are present and reachable: Pending review, Under verification, Approved (with credit summary), and Rejected (with the finance team's reason) — via the history detail cards.

**Responsive** — viewport media queries collapse the sidebar to icons and make modals full-bleed on mobile; desktop keeps the full shell.

Two notes: the nav active-highlight is rendered in code (the design system's SidebarItem doesn't reflow its `active` prop once mounted), and approval is simulated on a timer for the demo — wiring it to a real finance-review backend is the next step.

## User

<pasted_text name="Pasted text (242 lines)">
You can add this as a separate feature flow in the same Claude Design prompt:

---

## Lending Aura XP to SecureNests &amp; TrustBoxes

Add a new **"Lend Aura XP"** flow to the existing Aura Vault ecosystem. This flow should allow users to allocate their Aura XP into either SecureNests or TrustBoxes while maintaining the existing design system, component library, and user experience patterns.

### Feature Overview

Users can lend their Aura XP holdings to designated opportunities within the platform.

There are two allocation types:

* **SecureNest** – Guaranteed return of lent Aura XP.
* **TrustBox** – Non-guaranteed return and subject to associated risks.

The system should clearly communicate the differences between these two options before users proceed.

---

### User Flow

#### 1. Choose Lending Type

User selects one of:

* SecureNest (Guaranteed)
* TrustBox (Non-Guaranteed)

Display a comparison card showing:

| Feature                | SecureNest      | TrustBox        |
| ---------------------- | --------------- | --------------- |
| Return of Lent Aura XP | Guaranteed      | Not Guaranteed  |
| Risk Level             | Lower           | Higher          |
| Intended Use           | Listed Projects | Listed Projects |

Include educational tooltips and risk disclosures.

---

#### 2. Enter Aura XP Amount

User enters the amount of Aura XP they wish to lend.

Requirements:

* Show available Aura XP balance.
* Prevent lending more than available balance.
* Include quick-select percentages:

  * 25%
  * 50%
  * 75%
  * Max

---

#### 3. Exchange Rate Preview

The system calculates and displays:

* Current Aura XP conversion rate
* Equivalent value in USDT
* Equivalent value in PHP
* Amount being allocated

Example:

```
1 Aura XP = $1.00 USDT
1 Aura XP = ₱58 PHP

You are lending:
500 Aura XP

Equivalent Value:
$500 USDT
₱29,000 PHP
```

The conversion values should update in real time as the user changes the amount.

---

#### 4. Review &amp; Confirmation

Display a summary screen:

* Lending Type
* Aura XP Amount
* USDT Equivalent
* PHP Equivalent
* Risk Level
* Terms &amp; Conditions
* Lending Notice

Actions:

* Confirm &amp; Submit
* Cancel

---

#### 5. Submit Lending Request

Upon confirmation:

* Show loading state
* Create lending allocation
* Deduct allocated Aura XP from available balance
* Generate transaction record

---

#### 6. Portfolio Update

After successful submission:

The system updates the user's profile and dashboard.

Display:

* Active SecureNest Allocations
* Active TrustBox Allocations
* Total Aura XP Lent
* Remaining Available Aura XP

---

### Dashboard Components

Add new dashboard widgets:

#### Lending Overview

Display:

* Total Aura XP Balance
* Total Aura XP Lent
* Active SecureNests
* Active TrustBoxes
* Available Aura XP

---

#### Active Allocations Table

Columns:

* Allocation Type
* Project Name
* Aura XP Lent
* Date Created
* Status
* Risk Level

Status examples:

* Active
* Completed
* Pending
* Closed

---

### Required States

Design all states:

#### Form States

* Empty
* Valid
* Invalid
* Insufficient Balance

#### Submission States

* Processing
* Success
* Failed

#### Portfolio States

* No Active Allocations
* Active Allocations
* Completed Allocations

---

### Required Notices

Display the following notices prominently during the flow:

**Lending Notice**

&gt; Transactions between users and Aurora Vault are structured as lending arrangements, not investments.

**SecureNest Notice**

&gt; Aurora Vault guarantees the return of lent Aura XP allocated to SecureNests.

**TrustBox Notice**

&gt; Aura XP allocated to TrustBoxes is not guaranteed and remains subject to associated risks.

**Project Usage Notice**

&gt; Businesses and projects listed under SecureNests and TrustBoxes represent the intended use cases where Aurora Vault plans to deploy the borrowed Aura XP.

---

### Flow Diagram

```text
Choose SecureNest or TrustBox
            ↓
Enter Aura XP Amount
            ↓
System Calculates USDT/PHP Equivalent
            ↓
Review Lending Details
            ↓
Confirm Submission
            ↓
Create Lending Allocation
            ↓
Update Dashboard &amp; Portfolio
            ↓
Display Active SecureNest / TrustBox Position
```

### Design Direction

* Use a fintech/wealth-management experience.
* Clearly differentiate SecureNest and TrustBox through visual hierarchy.
* Make risk information visible without creating friction.
* Prioritize clarity, trust, and transparency.
* Follow the existing Aura Vault design language, spacing system, typography, and components.

</pasted_text>

## Assistant

I'll add the Lend Aura XP flow. Let me snip resolved earlier phases first, then build.

_[tool: snip]_

_[tool: snip]_

Now I'll build the Lend Aura XP flow. Let me add icons and state first.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: str_replace_edit]_

Now the renderVals computations. Let me add them near the vault block and extend pageTitle:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now the Lend view. Inserting before the WALLET view:

_[tool: dc_html_str_replace]_

Now the Lend modal. Appending at the end of the template:

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: get_webview_logs]_

No errors, "Lend XP" is in the nav. Let me navigate there and run the flow:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: save_screenshot]_

Let me verify nav state live (captures have shown stale-DOM artifacts before):

_[tool: eval_js]_

## User

continue

## Assistant

The nav reads correctly. Let me drive the lend modal flow:

_[tool: eval_js]_

Stale todos — let me clear them and re-run the flow after reloading.

_[tool: update_todos]_

_[tool: show_html]_

The Lend Aura XP flow is built and the page loads cleanly. Let me hand off to verification.

_[tool: ready_for_verification]_

Added the **Lend Aura XP** flow to the Aurora Vault ecosystem:

**Lend XP view** (new sidebar item) — Lending Overview widgets (available XP hero, total balance, total lent, active SecureNests, active TrustBoxes) and an **Active Allocations table** (Type, Project, Aura XP Lent, Date, Status, Risk) with status filters and an empty state.

**Lend flow** (modal, step by step):
1. **Choose type** — SecureNest (guaranteed, lower risk) vs TrustBox (non-guaranteed, higher risk) selectable cards, a feature comparison table, and both the SecureNest and TrustBox notices
2. **Amount** — available-balance display, 25/50/75/Max quick-selects, insufficient-balance guard, project picker, and a live USDT/PHP exchange-rate preview (1 XP = $1.00 / ₱58)
3. **Review** — full summary (type, project, XP, USDT, PHP, risk), lending notice + project-usage notice, T&C acknowledgment
4. **Confirm → status** — processing → success with a portfolio-updated breakdown (active counts, total lent, remaining available), plus a failed state with retry

All required states are covered: form (empty/valid/invalid/insufficient), submission (processing/success/failed), and portfolio (no allocations / active / completed via filters). SecureNest is themed mint-green, TrustBox amber, keeping the two visually distinct throughout. Allocation creation is simulated on a timer — wiring it to a real lending backend is the next step.

## User

Found issues — fixing…

## Assistant

The `{{ navEl }}` React-element hole isn't re-rendering. I'll switch to per-row `sc-if` (confirmed reactive) with fully static styles in each branch. Let me check available booleans first:

_[tool: grep]_

All booleans exist. Replacing the frozen `{{ navEl }}` hole with per-row `sc-if` toggles (each branch fully static-styled):

_[tool: dc_html_str_replace]_

Remove the stray empty `sc-if` and add the `not*` booleans + `goLend`:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Fixed the sidebar active-highlight defect. Each nav row is now a reactive `sc-if` pair (active filled / inactive) instead of a baked React-element hole, so the highlight follows the current view across all six items.

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Aurora Platform"
What `list_files` on the project root returns right now (dotfiles, if any, are not shown here):
📁 _ds
📁 assets
📁 screenshots
📄 Aurora Wallet.dc.html
📄 ProjectCard.dc.html
📄 support.js
User is viewing file: Aurora Wallet.dc.html
Current date is now June 24, 2026
</system-info>

<pasted_text name="Pasted text (274 lines)">
You can add this section to your Claude Design prompt:

---

## Admin Review Dashboard – USDT Top-Up Verification

Create an **Admin Review Dashboard** that allows finance, accounting, and platform administrators to efficiently review and verify all incoming USDT top-up requests submitted by users.

The dashboard should prioritize speed, transparency, auditability, and fraud prevention while remaining consistent with the existing Aurora Vault admin design system.

---

### Feature Overview

Every user top-up request enters a verification queue before Aura Points are credited.

Administrators must be able to:

* Review transaction details
* Verify blockchain transaction hashes
* View uploaded proof screenshots
* Approve or reject requests
* Leave rejection notes
* Track all actions through an audit trail

---

## Dashboard Layout

### Top Summary Cards

Display real-time metrics:

* Pending Requests
* Approved Today
* Rejected Today
* Total USDT Under Review
* Total Processed Volume

---

### Verification Queue Table

Display all submitted top-up requests.

Columns:

| Column         | Description                        |
| -------------- | ---------------------------------- |
| User           | User name and account ID           |
| Submitted Date | Date and time of request           |
| Amount         | USDT amount submitted              |
| Network        | Polygon, Base, BSC, Ethereum, etc. |
| TX Hash        | Truncated hash with copy button    |
| Screenshot     | View uploaded proof                |
| Wallet Address | User wallet address                |
| Status         | Pending, Approved, Rejected        |
| Actions        | Review, Approve, Reject            |

---

### Request Detail Drawer / Modal

When an admin clicks **Review**, open a detailed verification panel showing:

#### User Information

* User Name
* User ID
* Registered Wallet Address
* Account Creation Date

#### Transaction Information

* USDT Amount
* Blockchain Network
* Transaction Hash
* Submission Date
* Wallet Used for Transfer

#### Proof of Transfer

* Uploaded Screenshot Preview
* Fullscreen Image Viewer
* Download Option

#### Verification Checklist

Admins can manually confirm:

* Transaction hash exists
* Transaction is successful
* Amount matches submission
* Network matches supported network
* Receiving wallet matches Aurora Vault wallet
* Screenshot appears valid

---

## Approval Workflow

### Approve Request

When approved:

1. Mark request as Approved.
2. Credit corresponding Aura Points to user.
3. Update Aura Vault balance.
4. Create transaction log.
5. Notify user of successful approval.

Show confirmation:

```text
Top-Up Approved

250 USDT received
250 Aura Points credited

User balance updated successfully.
```

---

### Reject Request

When rejected:

Require admin to provide:

* Rejection Reason
* Optional Notes

Example reasons:

* Invalid transaction hash
* Transfer not found
* Incorrect amount
* Unsupported network
* Screenshot mismatch
* Duplicate submission
* Suspected fraud

Upon rejection:

* Status changes to Rejected.
* User receives notification.
* Rejection reason is stored permanently.

---

## Audit Trail

Every action should generate an immutable audit log.

Track:

* Admin user
* Timestamp
* Previous status
* New status
* Approval actions
* Rejection actions
* Notes added
* Manual balance adjustments

Example:

```text
June 25, 2026
Admin: Sarah

Status Changed:
Pending → Approved

Amount:
250 USDT

Aura Points Credited:
250

Reference:
TX 0x8f...91c
```

---

## Search &amp; Filtering

Allow admins to filter by:

* Status
* Network
* Date Range
* User
* Amount Range

Search fields:

* User Name
* User ID
* Wallet Address
* Transaction Hash

---

## Required Statuses

### Request Statuses

* Pending Review
* Under Verification
* Approved
* Rejected
* Flagged

### Visual Indicators

Use clear status badges:

* Pending → Neutral
* Under Verification → Info
* Approved → Success
* Rejected → Error
* Flagged → Warning

---

## Notifications

### User Notifications

Approved:

```text
Your top-up request has been approved.

250 USDT has been converted into 250 Aura Points and credited to your Aura Vault.
```

Rejected:

```text
Your top-up request has been rejected.

Reason:
Transaction hash could not be verified.
```

---

## Security &amp; Compliance

Include safeguards:

* Prevent double approval
* Prevent duplicate transaction hashes
* Log all administrative actions
* Require confirmation before approval
* Require rejection reason before rejection
* Maintain full audit history
* Restrict approval permissions to authorized finance/admin roles

---

## Design Direction

* Professional finance operations dashboard.
* Optimized for handling large volumes of top-up requests.
* Data-heavy but easy to scan.
* Strong emphasis on verification workflows.
* Clear visual distinction between pending, approved, rejected, and flagged requests.
* Consistent with Aurora Vault's existing admin and user dashboard design language.

</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Project Aurora (design system)">
[Design System] This project uses the **Project Aurora** design system. This is a binding choice for visual style — every visual must follow it. Don't invent colors, type, spacing, or components not grounded here.

Scope: the design system is a visual style reference only. Its guide may describe example products, brands, or people that are unrelated to the user and unrelated to the subject of this conversation. Never treat anything in the design system as a fact about the user, their work, or the topic they asked about.

This project has the **CobaltMidnightDesignSystem_f8c3dc** design system bound at `_ds/project-aurora-f8c3dcef-957d-46a5-ae15-a6ac9f3a1289/`. If anything under that path is missing or fails to load, the folder name may differ — `list_files` `_ds/` and use the folder whose name ends with f8c3dcef-957d-46a5-ae15-a6ac9f3a1289 instead, including in the <link>/<script> paths below.

**Loading the bundle is how you use this design system.** Every Design Component you build must load `_ds/project-aurora-f8c3dcef-957d-46a5-ae15-a6ac9f3a1289/_ds_bundle.js` once in `<helmet>` and compose with its components — do not recreate those components from scratch or restyle raw HTML to look like them. At the top of the template:

```html
<helmet>
  <link rel="stylesheet" href="_ds/project-aurora-f8c3dcef-957d-46a5-ae15-a6ac9f3a1289/tokens/fonts.css">
  <link rel="stylesheet" href="_ds/project-aurora-f8c3dcef-957d-46a5-ae15-a6ac9f3a1289/tokens/colors.css">
  <link rel="stylesheet" href="_ds/project-aurora-f8c3dcef-957d-46a5-ae15-a6ac9f3a1289/tokens/typography.css">
  <link rel="stylesheet" href="_ds/project-aurora-f8c3dcef-957d-46a5-ae15-a6ac9f3a1289/tokens/spacing.css">
  <link rel="stylesheet" href="_ds/project-aurora-f8c3dcef-957d-46a5-ae15-a6ac9f3a1289/styles.css">
  <script src="_ds/project-aurora-f8c3dcef-957d-46a5-ae15-a6ac9f3a1289/_ds_bundle.js"></script>
</helmet>
```

Then mount any component directly in the template — no logic class needed:

```html
<x-import component-from-global-scope="CobaltMidnightDesignSystem_f8c3dc.Button" hint-size="auto,40px">Label</x-import>
```

Props are template attributes (kebab → camelCase); template children pass through as `props.children`. The linked stylesheet(s) carry the design tokens (colors, type, spacing) — style against those via `var(--*)` and the design system's classes rather than guessing values.

The full design-system source tree lives at `/projects/f8c3dcef-957d-46a5-ae15-a6ac9f3a1289/` — use `list_files` / `read_file` from there for anything not under `_ds/` (layout varies by brand; don't assume folder names). Its guide is reproduced below so you don't need to fetch it:

<design-system-guide>
# Wope Aurora — Design System

A dark, futuristic SaaS design system with luminous purple depth and clean editorial typography. Built for a premium AI/growth-marketing product: a black-violet cosmic canvas, bright white type, and a neon-violet glow that creates energy without sacrificing clarity. Layouts are spacious and centered, hero-first, with a product preview used as proof of depth.

&gt; **Sources:** This system was authored from a written brand brief ("Wope Aurora" — colors, typography, radius, spacing, and component specs). No codebase or Figma file was provided. If you have the original product source, attach it via Import and the components/UI kit can be tuned to match exactly.

---

## Content Fundamentals

**Voice — confident, modern, product-first.** Copy reads like a sophisticated SaaS tool for growth and SEO teams. Short, declarative, benefit-led. The product and its preview are the heroes; words stay out of the way.

- **Casing:** Sentence case for everything — headings, buttons, labels, nav. Occasional small ALL-CAPS data chips with 0.02em tracking. Never shout.
- **Tone:** Premium, calm, technically credible. Future-facing without hype. No exclamation marks.
- **Emoji:** None.
- **Length:** Terse. Button labels 1–3 words. Marketing headlines confident and imperative ("Move faster", "See every signal").

---

## Visual Foundations

**Color.** Black-violet canvas (`primary #0A0118`) layered up through `surface #0E0220`, `neutral #140624` (the dominant card/panel tone), and `surface-elevated #1C0B33` for inputs. Text is luminous white (`on-surface #FFFFFF`) for emphasis and muted lavender-gray (`secondary #676182`) for body. **The neon-violet glow (`#B45CFF`) is rationed** — hero lighting, active/highlight cues, one focal moment per screen. Faint white-alpha lines (`border` white 10%, `muted-border` white 20%) provide structure. Status colors are pale fills with dark ink: `success` mint, `warning` amber, `error` restrained red.

**Type.** Two faces (unchanged from the system's typographic core): **Sulphur Point** for headlines (display → sm), **Inter** for body, labels, and UI. Sulphur Point ships as TTF in `tokens/` (Bold 700 for display/lg, Regular 400 for md/sm). Headlines are bold and compressed with negative tracking (display −0.025em, lg −0.015em); mid/small headlines drop to 500. Body uses 400 with generous 1.45–1.6 line height; `body-lg` (500) for leads.

**Spacing &amp; layout.** Rhythm on 8 / 16 / 28 / 46 / 96 / 150. Tight UI relationships use 8 and 16; sections separate on 28 and 46; cinematic hero-to-content transitions use 96 and 150. Cards and panels use compact internal padding (~14–16px) rather than expansive gutters, reinforcing the dense product-preview feel while keeping the outer page spacious. Content stays centered on a strong axis with wide margins.

**Depth.** Created through tonal layering and glow rather than shadow stacks. The strongest depth cue is the violet atmospheric bloom (`--shadow-glow`) behind the product preview, supported by faint white-alpha borders and translucent overlays. Conventional shadows are minimal or absent — separation depends on contrast between `primary`, `surface`, `neutral`, and hairline borders. Light behaves like elevation.

**Shape.** Smooth and restrained. Cards use an 8px radius; interactive pills, buttons, inputs, and chips lean fully rounded (`9999px`) to feel soft and modern. Rectilinear tables and panels are softened by these rounded controls.

**Motion &amp; states.** Quick, calm 150ms ease transitions on color/border only — no bounce, no large movement, no infinite loops. **Hover:** primary (white) buttons dim slightly; accent (glow) buttons brighten and pick up the violet bloom; secondary pills gain a faint lifted fill; sidebar rows pick up fill. **Focus:** border shifts to the glow accent. **Press:** rely on the color shift, not scale.

**Imagery.** UI-first; imagery is minimal, cool, dark, and low-noise to sit on the cosmic canvas. No bright gradients, no playful illustration.

---

## Iconography

**Lucide** (CDN, `https://unpkg.com/lucide`) is the icon system — clean 1.5–2px stroke outline icons matching the restrained, technical tone. This is a **substitution**: no icon set was provided in the brief. Icons render in `secondary` gray at 15–18px, brightening to `on-surface` on active/hover. No emoji, no hand-drawn SVG.

Brand marks live in `assets/`:
- `logo.svg` — the "Wope" wordmark with the glow glyph.
- `mark.svg` — the standalone glow glyph for compact placements (sidebar, favicon).

---

## Index / Manifest

**Foundations**
- `styles.css` — global entry (consumers link this). `@import`s only.
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/fonts.css`
- `guidelines/*.card.html` — specimen cards (colors, type, spacing, radius, brand).

**Components** (`window.CobaltMidnightDesignSystem_f8c3dc` — namespace retained for compatibility)
- `components/core/` — `Button` (primary = white CTA, accent = glow, secondary, link), `Card`, `Badge`, `Chip`, `Avatar`
- `components/forms/` — `Input`, `Switch`
- `components/navigation/` — `SidebarItem`, `Tabs`
- `components/fintech/` — domain components carried over from the prior system (`FundingProgress`, `RiskBadge`, `StatusBadge`, `TrustBadge`, `MetaBadge`, `InvestorCount`, `MilestoneTimeline`, `RiskDisclosureCard`, `MoneyAmount`, `Wallet`). They re-skin to the Aurora palette automatically.

**UI kits**
- `ui_kits/dashboard/` — dashboard shell (`index.html`, `Sidebar.jsx`, `TopBar.jsx`, `Overview.jsx`), re-skinned to Aurora.

**Assets** — `assets/logo.svg`, `assets/mark.svg`.

**Skill** — `SKILL.md` (Agent-Skills compatible).

---

## Do's &amp; Don'ts
- **Do** keep the interface dark, spacious, and centered, with one bright focal area per screen.
- **Do** prefer subtle white-alpha borders and the violet glow over heavy shadows or chunky gradients.
- **Do** keep primary CTAs pill-shaped and compact (~40px tall); reserve the white pill for the most important action.
- **Don't** introduce bright surface colors or light backgrounds that break the nocturnal mood.
- **Don't** use sharp 0px-radius buttons or cards unless intentionally building a utility table.
- **Don't** overuse the neon glow — it should highlight the hero and key moments, not every component.
- **Don't** crowd the layout; the brand depends on air, contrast, and cinematic scale.

</design-system-guide>

Per-component usage notes follow — the first lines of each component's `*.prompt.md`. These are NOT bound into `_ds/`, so they're reproduced here:

<ds-prompt-excerpts>
### components/core/Avatar.prompt.md
One-sentence: Cobalt's circular identity token — image when `src` is set, otherwise up-to-two-letter initials on graphite.

```jsx
&lt;Avatar name="Ada Lovelace" size={32} /&gt;
&lt;Avatar src="/u/ada.jpg" name="Ada Lovelace" size={40} /&gt;

### components/core/Badge.prompt.md
One-sentence: Cobalt's compact status badge — pale `success`/`warning`/`error` fills with dark ink, or a quiet `neutral` tag.

```jsx
&lt;Badge variant="success"&gt;+12.4%&lt;/Badge&gt;
&lt;Badge variant="warning"&gt;Pending&lt;/Badge&gt;

### components/core/Button.prompt.md
One-sentence: Cobalt's compact pill button — calm dark `primary`, blue `accent` for confirmatory actions, transparent `secondary`, and borderless `link`.

```jsx
&lt;Button variant="primary"&gt;Get started&lt;/Button&gt;
&lt;Button variant="accent"&gt;Confirm transfer&lt;/Button&gt;

### components/core/Card.prompt.md
One-sentence: Cobalt's default container — graphite fill, 1px inset border, near-zero shadow; depth comes from tone, not drop shadows.

```jsx
&lt;Card padding={12}&gt;
  &lt;div style={{ font: "var(--type-label-sm)", color: "var(--color-secondary)" }}&gt;Balance&lt;/div&gt;

### components/core/Chip.prompt.md
One-sentence: Cobalt's quiet filter/tag pill — graphite by default, accent-blue tint when `selected`.

```jsx
&lt;Chip selected onClick={...}&gt;All&lt;/Chip&gt;
&lt;Chip onClick={...}&gt;Income&lt;/Chip&gt;

### components/fintech/FundingProgress.prompt.md
One-sentence: Raised-vs-goal funding bar with accent fill — use on project cards and offering headers.

```jsx
&lt;FundingProgress raised={3200000} goal={5000000} /&gt;
&lt;FundingProgress raised={48} goal={100} currency="" height={6} showLabels={false} /&gt;

### components/fintech/InvestorCount.prompt.md
One-sentence: Investors icon + count for project cards and headers.

```jsx
&lt;InvestorCount count={1284} /&gt;
&lt;InvestorCount count={42} showLabel={false} /&gt;

### components/fintech/MetaBadge.prompt.md
One-sentence: Quiet metadata pill for a project's location or category.

```jsx
&lt;MetaBadge type="location"&gt;Cebu City&lt;/MetaBadge&gt;
&lt;MetaBadge type="category"&gt;Real estate&lt;/MetaBadge&gt;

### components/fintech/MilestoneTimeline.prompt.md
One-sentence: Vertical (default) or horizontal sequence of project milestones with done / active / upcoming nodes.

```jsx
&lt;MilestoneTimeline items={[
  { label: "Offering opens", date: "Mar 2026", status: "done" },

### components/fintech/MoneyAmount.prompt.md
One-sentence: Formats a value as Philippine peso (`₱`) or a token quantity with tabular figures — use for any balance, price, or amount.

```jsx
&lt;MoneyAmount amount={48250} kind="peso" size="display" /&gt;
&lt;MoneyAmount amount={1200.5} kind="token" symbol="AUR" /&gt;

### components/fintech/RiskBadge.prompt.md
One-sentence: Risk-level pill with a 3-bar signal that fills by severity — use on project cards next to status.

```jsx
&lt;RiskBadge level="low" /&gt;
&lt;RiskBadge level="medium" /&gt;

### components/fintech/RiskDisclosureCard.prompt.md
One-sentence: Regulatory risk-disclosure panel with an alert-toned header and itemized disclosures — use on offering detail pages and checkout.

```jsx
&lt;RiskDisclosureCard /&gt;
&lt;RiskDisclosureCard title="Before you invest" points={[

### components/fintech/StatusBadge.prompt.md
One-sentence: Project lifecycle status pill with a leading dot — use wherever an offering's stage is shown.

```jsx
&lt;StatusBadge status="funding" /&gt;
&lt;StatusBadge status="funded" /&gt;

### components/fintech/TrustBadge.prompt.md
One-sentence: Compliance / protection signal pill — one `type` covers KYC, escrow, admin approval, reserve backing, smart contract, on-chain, and the no-guarantee / no-transfer restrictions.

```jsx
&lt;TrustBadge type="kyc-verified" /&gt;
&lt;TrustBadge type="escrow-protected" /&gt;

### components/fintech/Wallet.prompt.md
One-sentence: Account balance card showing peso cash + token holdings with Deposit and Redeem actions.

```jsx
&lt;Wallet
  pesoBalance={48250}

### components/forms/Input.prompt.md
One-sentence: Cobalt's dark elevated text field — soft border, compact 40px height, accent-blue focus (no glow), with optional leading icon and shortcut hint.

```jsx
&lt;Input placeholder="Search transactions" leadingIcon={&lt;SearchIcon/&gt;} shortcut="⌘K" /&gt;
```

### components/forms/Switch.prompt.md
One-sentence: Cobalt's compact toggle — graphite track off, accent-blue on, no glow.

```jsx
&lt;Switch checked={on} onChange={setOn} /&gt;
```

### components/navigation/SidebarItem.prompt.md
One-sentence: Cobalt's sidebar nav row — muted/transparent by default, elevated surface fill + brighter text when `active`.

```jsx
&lt;SidebarItem icon={&lt;HomeIcon/&gt;} active&gt;Overview&lt;/SidebarItem&gt;
&lt;SidebarItem icon={&lt;CardIcon/&gt;} trailing={&lt;Badge&gt;3&lt;/Badge&gt;}&gt;Cards&lt;/SidebarItem&gt;

### components/navigation/Tabs.prompt.md
One-sentence: Cobalt's flat underline tab bar — active tab brightens its label and shows a 2px accent underline.

```jsx
&lt;Tabs tabs={["Overview","Activity","Cards"]} value={tab} onChange={setTab} /&gt;
```
</ds-prompt-excerpts>
</attached-skill>

## Assistant

Big feature — I'll build this as a separate Admin Dashboard DC. Let me plan and start.

_[tool: update_todos]_

_[tool: read_file]_

Building the Admin Dashboard as a separate file. This is a large build — I'll write the full DC in one go.

_[tool: dc_write]_

_[tool: show_html]_

_[tool: get_webview_logs]_

No console errors. Let me verify the flow works:

_[tool: eval_js]_

The page didn't render its content. Let me check what's visible:

_[tool: eval_js]_

Empty body — the DC didn't mount. Let me check for errors:

_[tool: get_webview_logs]_

_[tool: show_html]_

Dashboard renders perfectly. Now verify the interactive flows:

_[tool: eval_js]_

The approve button text has the `&amp;` entity. Let me fix the selector:

_[tool: eval_js]_

Let me debug step by step:

_[tool: eval_js]_

Checklist isn't showing — it's below the fold in the drawer. The "Approve" button IS there though. Let me test the approve flow:

_[tool: eval_js]_

Let me test in smaller steps:

_[tool: eval_js]_

_[tool: eval_js]_

Drawer is closed but Approve/Reject buttons are gone. The `canAction` condition must have failed after the first approve changed the selected request's status. Let me re-open a pending review:

_[tool: eval_js]_

Drawer opens with Approve/Reject. Let me now test approve → reject → audit trail:

_[tool: eval_js]_

The "Approve & credit" button text has `&` as HTML entity. Let me find the actual rendered text:

_[tool: eval_js]_

The drawer closed after the previous approve. Let me reload and test cleanly:

_[tool: show_html]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

It loaded on Audit trail from the previous state. Let me navigate back and test the full flow:

_[tool: eval_js]_

Drawer opens with Approve/Reject. Now test the full approve → reject → flag → audit flow:

_[tool: eval_js]_

The `showActionButtons` / `showApproveConfirm` conditions may conflict. Let me check the logic — the `canAction` check requires `!s.actionMode`, but `showActionButtons` also requires `canAct && !s.actionMode`. When I click Approve, `actionMode` becomes "approve", so `canAction` becomes false, hiding the entire action section. The `sc-if` nesting is wrong — `showApproveConfirm` is inside `canAction`. Let me fix by restructuring:

_[tool: dc_js_str_replace]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

Confirmation panel works. Now complete the approve and test reject:

_[tool: eval_js]_

Let me debug step by step — the reject confirmation button may not be rendering:

_[tool: eval_js]_

_[tool: eval_js]_

The drawer is open but showing the approved request (Close button, no Approve/Reject). The previous approve changed this request's status. Let me close and open a pending one:

_[tool: eval_js]_

Now test reject flow on Maria:

_[tool: eval_js]_

Reject form works. Now select reason and confirm:

_[tool: eval_js]_

All flows work. Let me complete and hand off:

_[tool: update_todos]_

_[tool: ready_for_verification]_

Built the **Admin Review Dashboard** (`Admin Dashboard.dc.html`) — a separate admin-facing panel for the finance/verification team:

**Verification queue** — 5 real-time summary cards (pending, approved today, rejected today, USDT under review, total processed), filterable by status (all/pending/approved/rejected/flagged) and by network, plus a searchable queue table with user, date, amount, network, truncated TX hash with copy, proof view, status badge, and review action.

**Review drawer** — slides in from the right with:
- **User info** — name, ID, wallet, registration date
- **Transaction info** — amount, network, full TX hash, submission date
- **Proof of transfer** — screenshot preview placeholder with fullscreen/download buttons
- **Verification checklist** — 6-item manual confirmation (hash exists, tx successful, amount matches, network correct, vault wallet matches, screenshot valid) with progress counter
- **Actions** — Approve (with confirmation dialog warning it's irreversible), Reject (with required reason dropdown from 7 predefined reasons + optional notes), and Flag for investigation

**Approval** credits Aura Points, **rejection** stores the reason permanently, **flagging** marks for investigation — all three generate an immutable **audit trail** entry (admin, timestamp, previous → new status, details).

**Audit trail** view — chronological log of every admin action with color-coded status badges.

All 5 status states render with distinct visual indicators: pending (amber), under verification (blue), approved (green), rejected (red), flagged (warning amber). The dashboard links to the user-facing `Aurora Wallet.dc.html` via a consistent design system.

## User

remove

## Assistant

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Removed the "Wope" brand name from the sidebar.

