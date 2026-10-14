# Ultima Works Authentication and Recovery Test Plan

## Application Overview

Test the unauthenticated entry points for Ultima Works at https://ultimaworks.ltm.com/home. The site redirects to a Microsoft Entra sign-in page. The browser session has no authenticated corporate account, so authenticated Ultima Works workflows are not observable in this plan. Tests use a fresh unauthenticated browser state and do not submit real credentials.

## Test Scenarios

### 1. Unauthenticated access and account recovery

**Seed:** `tests/seed.spec.ts`

#### 1.1. Redirects a fresh visitor to Microsoft sign-in

**File:** `tests/UltimaWorks/redirects-to-sign-in.spec.ts`

**Steps:**
  1. Navigate to https://ultimaworks.ltm.com/home in a fresh unauthenticated browser session.
    - expect: The browser is redirected to login.microsoftonline.com.
    - expect: The page title is Sign in to your account and a Sign in heading is visible.
  2. Inspect the available sign-in actions.
    - expect: The Sign-in options button and Can’t access your account? link are visible.
    - expect: Ultima Works authenticated content is not displayed before authentication.

#### 1.2. Opens and exits alternate sign-in options

**File:** `tests/UltimaWorks/sign-in-options.spec.ts`

**Steps:**
  1. Navigate to https://ultimaworks.ltm.com/home in a fresh unauthenticated browser session and wait for the Microsoft sign-in page.
    - expect: The Microsoft sign-in page is displayed.
  2. Select Sign-in options.
    - expect: A Sign-in options heading is displayed.
    - expect: A Back button is available.
  3. Select Back.
    - expect: The initial Sign in page is displayed again.
    - expect: The Sign-in options action is available.

#### 1.3. Validates empty and malformed work-account recovery identifiers

**File:** `tests/UltimaWorks/work-account-recovery-validation.spec.ts`

**Steps:**
  1. Navigate to https://ultimaworks.ltm.com/home in a fresh unauthenticated browser session.
    - expect: The browser is redirected to Microsoft sign-in.
  2. Select Can’t access your account?, then select Work or school account.
    - expect: The Microsoft Online Password Reset page opens.
    - expect: The Get back into your account heading and Email or Username field are visible.
  3. Leave Email or Username empty and select Next.
    - expect: A validation message asks for an email address in the format user@contoso.onmicrosoft.com or user@contoso.com.
    - expect: The recovery form remains open.
  4. Enter not-an-email and select Next.
    - expect: The same email-format validation message is displayed.
    - expect: The malformed value remains in the Email or Username field and recovery does not advance.

#### 1.4. Cancels work-account recovery back to sign-in

**File:** `tests/UltimaWorks/cancel-work-account-recovery.spec.ts`

**Steps:**
  1. Navigate to https://ultimaworks.ltm.com/home in a fresh unauthenticated browser session.
    - expect: The browser is redirected to Microsoft sign-in.
  2. Select Can’t access your account?, then select Work or school account.
    - expect: The Microsoft Online Password Reset page opens with a Cancel button.
  3. Select Cancel.
    - expect: The browser returns to the Microsoft sign-in page.
    - expect: The page title is Sign in to your account.
