// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file

//gets the prodnum and checks runs the check score function


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'showPageAction') {
        chrome.pageAction.show(sender.tab.id);
    }
});
