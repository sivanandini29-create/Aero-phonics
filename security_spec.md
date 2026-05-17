# Security Specification - AERO-PHONICS User Identity

## 1. Data Invariants
- A user document must have a `uid` that matches the document ID.
- Users can only read and write their own documents.
- `createdAt` is immutable after creation.
- Users cannot spoof their identity by setting `uid` to another user's ID.

## 2. The Dirty Dozen Payloads (Target: /users/{userId})

1. **Identity Spoofing**: Logged in as `userA`, attempting to create `users/userB`.
2. **Field Injection**: Adding `isAdmin: true` to a user profile.
3. **Immutable Violation**: Attempting to change `createdAt` on update.
4. **ID Poisoning**: Using a 2KB string as a document ID.
5. **PII Leak**: Authenticated `userA` attempting to read `users/userB`.
6. **Null Bypass**: Creating a user without a `uid` field.
7. **Type Mismatch**: Setting `displayName` to a number.
8. **Resource Exhaustion**: Setting `displayName` to a 1MB string.
9. **Unauthenticated Write**: Attempting to create a user profile while logged out.
10. **State Corruption**: Attempting to delete someone else's user profile.
11. **Email Spoofing**: Setting `email` to an admin's email without verification.
12. **Blanket Query**: Querying all users without a `where` clause filtering by own ID.

## 3. Test Runner (Draft)
A `firestore.rules.test.ts` would be required to programmatically verify these, but given the current environment, we will focus on hardening the rules logic first.
