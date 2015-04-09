//
//  TWTRLogInButtonManager.m
//  TwitterLogin
//
//  Created by Yosi Taguri on 3/28/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "TWTRLogInButtonManager.h"
#import <TwitterKit/TwitterKit.h>
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "UIView+React.h"

@implementation TWTRLogInButtonManager
@synthesize bridge = _bridge;
-(UIView*) view {
    TWTRLogInButton *button = [[TWTRLogInButton alloc] init];
    __weak TWTRLogInButton* buttonSelf = button;
    button.logInCompletion = ^(TWTRSession *session, NSError *error) {
        if (error) {
            NSDictionary *event = @{
                                    @"target": buttonSelf.reactTag,
                                    @"error": @{
                                                @"domain":error.domain,
                                                @"code":@(error.code),
                                                @"userInfo":[error.userInfo description]
                                            }
                                    };
            [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:event];
        } else {
            NSDictionary *body = @{@"authToken": session.authToken,
                                  @"authTokenSecret": session.authTokenSecret,
                                  @"userID":session.userID,
                                  @"userName":session.userName};
            NSDictionary *event = @{
                                    @"target": buttonSelf.reactTag,
                                    @"session": body};
            [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:event];
        }
    };
    return button;
}
@end
