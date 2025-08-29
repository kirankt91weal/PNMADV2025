# Prototype1 Test Cases - Comprehensive Breaking Guide

## Overview
This document contains comprehensive test cases for the PayNearMe IVA Prototype to systematically identify breaking points and edge cases.

## Flow Summary
1. **SMS/iMessage Flow** (Steps 0-2): Payment request → User response → Payment failure
2. **PayNearMe App** (Step 3): Payment failure screen with Contact Us
3. **Web Chat** (Step 4): IVA assistance with payment resolution
4. **Payment Processing**: Spinner → Receipt → Success messages
5. **Agent Connection**: Proactive offer → Call button → Call screen

## Test Categories

### 1. State Management Tests

#### Initial State Validation
- [ ] `currentStep` starts at 0
- [ ] `chatStep` starts at 0
- [ ] `paymentSuccessful` starts as false
- [ ] `processingPayment` starts as false
- [ ] `showCallScreen` starts as false
- [ ] `chatMessagesRef` is initialized

#### State Reset Functionality
- [ ] `resetConversation()` resets all states to initial values
- [ ] Reset button in header works correctly
- [ ] Navigation to home page works

### 2. Screen Navigation Tests

#### Click Progression (Steps 0-3)
- [ ] Click advances from step 0 → 1 (shows user response)
- [ ] Click advances from step 1 → 2 (shows payment failure)
- [ ] Click advances from step 2 → 3 (shows PayNearMe app)
- [ ] Click advances from step 3 → 4 (shows web chat)
- [ ] Clicks beyond step 3 don't break the flow

#### Contact Us Button
- [ ] Sets `currentStep` to 4
- [ ] Resets `chatStep` to 0
- [ ] Triggers 1-second delay to show initial message
- [ ] Chat messages appear after delay

### 3. Chat Flow Tests

#### Message Progression
- [ ] Initial message appears at `chatStep >= 0.5`
- [ ] Failed payment details card appears
- [ ] Quick reply buttons appear correctly
- [ ] User response appears at `chatStep >= 1`
- [ ] IVA response appears at `chatStep >= 1.5`
- [ ] Account unblocking message appears
- [ ] Payment form appears at `chatStep >= 2`

#### Chat Step Timing
- [ ] `handleChatProgression()` increments chatStep
- [ ] Staggered delays work correctly (500ms, 1500ms, 2500ms)
- [ ] Multiple rapid clicks don't break timing
- [ ] Timeout functions complete properly

### 4. Payment Processing Tests

#### Payment Form
- [ ] Form shows when `!paymentSuccessful && !processingPayment`
- [ ] Payment methods display correctly (**3469 selected first)
- [ ] Payment amount shows $450.00
- [ ] Pay button triggers `handlePaymentSuccess()`

#### Processing Flow
- [ ] Pay button sets `processingPayment` to true
- [ ] Processing spinner appears for 2 seconds
- [ ] Spinner shows correct animation and text
- [ ] After 2 seconds: `processingPayment` false, `paymentSuccessful` true

#### Receipt Display
- [ ] Receipt appears when `paymentSuccessful` is true
- [ ] All receipt details are correct (merchant, account, amount, etc.)
- [ ] Transaction ID generates correctly
- [ ] Green styling indicates success

### 5. Payment Success Messages

#### Message Timing
- [ ] Confirmation message appears at `chatStep >= 2.5` (2 seconds after receipt)
- [ ] Proactive offer appears at `chatStep >= 2.75` (4 seconds after receipt)
- [ ] Messages appear in correct order
- [ ] Auto-scroll works with new messages

#### Quick Reply Buttons
- [ ] Yes/No buttons appear with proactive offer
- [ ] Buttons have 50/50 width split (`flex-1`)
- [ ] Yes button advances to `chatStep = 3`
- [ ] Buttons disappear when `chatStep >= 3`

### 6. Agent Connection Tests

#### User Response
- [ ] User "Yes" response appears as blue chat bubble
- [ ] System response appears: "Great, click the button below..."
- [ ] Call button appears with correct styling
- [ ] Button has phone icon and "Call" text

#### Call Button Functionality
- [ ] Call button sets `showCallScreen` to true
- [ ] Button has hover effects and scaling
- [ ] Console logs work for debugging
- [ ] Click anywhere on chat also triggers call screen

### 7. Call Screen Tests

#### Call Screen Display
- [ ] Call screen appears when `showCallScreen` is true
- [ ] Screen has absolute positioning (`absolute inset-0 z-50`)
- [ ] Red background shows for debugging
- [ ] Screen covers entire iPhone area

#### Call Screen Elements
- [ ] Header shows "Active Call" with phone icon
- [ ] Agent avatar displays correctly
- [ ] "Connecting to Agent" status shows
- [ ] Timer shows "00:03" estimated wait time
- [ ] Three call control buttons appear (hang up, mute, volume)
- [ ] Agent info shows (VIP Priority Line, Sarah Johnson, Customer Success)

### 8. Auto-scroll Tests

#### Scroll Behavior
- [ ] Auto-scroll triggers on `chatStep` changes
- [ ] Auto-scroll triggers on `paymentSuccessful` changes
- [ ] `chatMessagesRef` scrolls to bottom correctly
- [ ] Scroll works with new messages appearing

### 9. UI/UX Tests

#### Visual Elements
- [ ] iPhone mockup displays correctly
- [ ] Status bar shows correct time and icons
- [ ] All animations work (`animate-fadeIn`)
- [ ] Colors match design (PayNearMe blue #4566D7)
- [ ] Icons display correctly (FontAwesome)

#### Responsive Design
- [ ] Layout works on different screen sizes
- [ ] iPhone mockup maintains proportions
- [ ] Text remains readable
- [ ] Buttons remain clickable

### 10. Edge Cases & Breaking Points

#### Rapid Interactions
- [ ] Multiple rapid Pay button clicks
- [ ] Rapid navigation through steps
- [ ] Quick successive chat progressions
- [ ] Spam clicking Call button

#### State Conflicts
- [ ] What happens if `paymentSuccessful` and `processingPayment` are both true?
- [ ] What if `showCallScreen` is true but `chatStep < 3`?
- [ ] What if user navigates away and back during processing?

#### Timing Issues
- [ ] What if user clicks during setTimeout delays?
- [ ] What if component unmounts during async operations?
- [ ] What if multiple timeouts overlap?

#### Browser Compatibility
- [ ] Works in Chrome, Firefox, Safari
- [ ] FontAwesome icons load correctly
- [ ] CSS animations work across browsers
- [ ] Touch events work on mobile

#### Memory Leaks
- [ ] setTimeout functions clean up properly
- [ ] useEffect cleanup functions work
- [ ] No infinite re-renders
- [ ] Refs are properly managed

### 11. Error Scenarios

#### Missing Dependencies
- [ ] What if FontAwesome doesn't load?
- [ ] What if React Router fails?
- [ ] What if useRef returns null?

#### Invalid States
- [ ] Negative chatStep values
- [ ] currentStep beyond expected range
- [ ] Undefined or null state values

#### Network Issues
- [ ] Component behavior during slow connections
- [ ] Handling of interrupted navigation
- [ ] Graceful degradation without icons

### 12. Performance Tests

#### Rendering Performance
- [ ] Component renders quickly on initial load
- [ ] State updates don't cause unnecessary re-renders
- [ ] Large DOM updates are smooth
- [ ] Animations don't cause jank

#### Memory Usage
- [ ] No memory leaks during long sessions
- [ ] Proper cleanup on component unmount
- [ ] Efficient re-rendering with state changes

## Breaking Strategies

### 1. State Manipulation
- Manually set conflicting states
- Set invalid state values
- Trigger state changes in wrong order

### 2. Timing Attacks
- Interrupt setTimeout functions
- Trigger multiple async operations
- Navigate away during processing

### 3. UI Stress Testing
- Rapid button clicking
- Simultaneous interactions
- Browser tab switching during flow

### 4. Edge Case Scenarios
- Disable JavaScript
- Block network requests
- Simulate slow devices
- Test with screen readers

### 5. Data Validation
- Invalid transaction IDs
- Malformed payment amounts
- Missing required fields

## Success Criteria
- [ ] All test cases pass
- [ ] No console errors
- [ ] Smooth user experience
- [ ] Proper error handling
- [ ] Accessible interface
- [ ] Cross-browser compatibility

## Notes
- Remove debug console.logs and red background before production
- Consider adding error boundaries for better error handling
- Add loading states for better UX
- Implement proper accessibility features
