# Notification System Implementation TODO

## Frontend FCM Setup

- [ ] Update Firebase config to include messaging import
- [ ] Create firebase-messaging-sw.js service worker in public folder

- [ ] Save FCM token to user document in Firestore
- [ ] Handle notification click to navigate to inbox

## Backend FCM Integration

- [ ] Add firebase-admin dependency to server/package.json
- [ ] Create /send-fcm-notification endpoint in server.js
- [ ] Trigger FCM notification when new message is created in conversations
- [ ] Add FCM server key environment variable configuration

## Visual Notification Badge

- [ ] Add Firestore listener in TraineeNavbar for unread messages count
- [ ] Create CSS for blue notification badge on profile picture
- [ ] Update badge when inbox is opened (mark as read)
- [ ] Handle real-time updates using Firestore listeners

## Testing & Configuration

- [ ] Test notification permission prompt on first visit
- [ ] Verify push notification arrives when new message is created
- [ ] Test notification click opens dashboard/inbox
- [ ] Confirm blue badge appears on profile picture when unread messages exist
- [ ] Verify badge disappears when inbox is opened
- [ ] Test with Netlify + Railway deployment
- [ ] Ensure service worker registers correctly
- [ ] Provide Firebase Cloud Messaging setup instructions

## Deployment & Environment

- [ ] Configure FCM server key in Railway environment variables
- [ ] Update Netlify \_redirects for service worker
- [ ] Test end-to-end notification flow
