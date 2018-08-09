// Objective-C API for talking to github.com/textileio/textile-go/mobile Go package.
//   gobind -lang=objc github.com/textileio/textile-go/mobile
//
// File is generated by gobind. Do not edit.

#ifndef __Mobile_H__
#define __Mobile_H__

@import Foundation;
#include "Universe.objc.h"


@class MobileDevice;
@class MobileDevices;
@class MobileEvent;
@class MobileExternalInvite;
@class MobileImageData;
@class MobileMobile;
@class MobileNodeConfig;
@class MobilePhoto;
@class MobilePhotos;
@class MobileThread;
@class MobileThreads;
@protocol MobileMessenger;
@class MobileMessenger;

@protocol MobileMessenger <NSObject>
- (void)notify:(MobileEvent*)event;
@end

@interface MobileDevice : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)id_;
- (void)setId:(NSString*)v;
- (NSString*)name;
- (void)setName:(NSString*)v;
@end

@interface MobileDevices : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
// skipped field Devices.Items with unsupported type: *types.Slice

@end

@interface MobileEvent : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)name;
- (void)setName:(NSString*)v;
- (NSString*)payload;
- (void)setPayload:(NSString*)v;
@end

@interface MobileExternalInvite : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)id_;
- (void)setId:(NSString*)v;
- (NSString*)key;
- (void)setKey:(NSString*)v;
- (NSString*)inviter;
- (void)setInviter:(NSString*)v;
@end

@interface MobileImageData : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)url;
- (void)setUrl:(NSString*)v;
@end

@interface MobileMobile : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)repoPath;
- (void)setRepoPath:(NSString*)v;
- (NSString*)mnemonic;
- (void)setMnemonic:(NSString*)v;
- (NSString*)acceptExternalThreadInvite:(NSString*)id_ key:(NSString*)key error:(NSError**)error;
- (BOOL)addDevice:(NSString*)name pubKey:(NSString*)pubKey error:(NSError**)error;
- (NSString*)addExternalThreadInvite:(NSString*)threadId error:(NSError**)error;
- (NSString*)addPhoto:(NSString*)path error:(NSError**)error;
- (NSString*)addPhotoToThread:(NSString*)dataId key:(NSString*)key threadId:(NSString*)threadId caption:(NSString*)caption error:(NSError**)error;
- (NSString*)addThread:(NSString*)name mnemonic:(NSString*)mnemonic error:(NSError**)error;
- (NSString*)addThreadInvite:(NSString*)threadId inviteePk:(NSString*)inviteePk error:(NSError**)error;
- (NSString*)devices:(NSError**)error;
- (NSString*)getId:(NSError**)error;
- (NSString*)getPeerProfile:(NSString*)peerId error:(NSError**)error;
- (NSString*)getPhotoData:(NSString*)id_ path:(NSString*)path error:(NSError**)error;
- (NSString*)getPhotoKey:(NSString*)id_ error:(NSError**)error;
- (NSString*)getPhotoMetadata:(NSString*)id_ error:(NSError**)error;
- (NSString*)getPhotos:(NSString*)offsetId limit:(long)limit threadId:(NSString*)threadId error:(NSError**)error;
- (NSString*)getProfile:(NSError**)error;
- (NSString*)getPubKey:(NSError**)error;
- (NSString*)getTokens:(NSError**)error;
- (NSString*)getUsername:(NSError**)error;
- (BOOL)isSignedIn;
- (NSString*)photoThreads:(NSString*)id_ error:(NSError**)error;
- (BOOL)refreshMessages:(NSError**)error;
- (BOOL)removeDevice:(NSString*)id_ error:(NSError**)error;
- (NSString*)removeThread:(NSString*)id_ error:(NSError**)error;
- (BOOL)setAvatarId:(NSString*)id_ error:(NSError**)error;
- (NSString*)sharePhotoToThread:(NSString*)dataId threadId:(NSString*)threadId caption:(NSString*)caption error:(NSError**)error;
- (BOOL)signIn:(NSString*)username password:(NSString*)password error:(NSError**)error;
- (BOOL)signOut:(NSError**)error;
- (BOOL)signUpWithEmail:(NSString*)email username:(NSString*)username password:(NSString*)password referral:(NSString*)referral error:(NSError**)error;
- (BOOL)start:(NSError**)error;
- (BOOL)stop:(NSError**)error;
- (NSString*)threads:(NSError**)error;
@end

@interface MobileNodeConfig : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)repoPath;
- (void)setRepoPath:(NSString*)v;
- (NSString*)cafeAddr;
- (void)setCafeAddr:(NSString*)v;
- (NSString*)logLevel;
- (void)setLogLevel:(NSString*)v;
- (BOOL)logFiles;
- (void)setLogFiles:(BOOL)v;
@end

@interface MobilePhoto : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)id_;
- (void)setId:(NSString*)v;
// skipped field Photo.Date with unsupported type: *types.Named

- (NSString*)authorId;
- (void)setAuthorId:(NSString*)v;
- (NSString*)caption;
- (void)setCaption:(NSString*)v;
@end

@interface MobilePhotos : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
// skipped field Photos.Items with unsupported type: *types.Slice

@end

@interface MobileThread : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)id_;
- (void)setId:(NSString*)v;
- (NSString*)name;
- (void)setName:(NSString*)v;
- (long)peers;
- (void)setPeers:(long)v;
@end

@interface MobileThreads : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
// skipped field Threads.Items with unsupported type: *types.Slice

@end

FOUNDATION_EXPORT MobileMobile* MobileNewNode(MobileNodeConfig* config, id<MobileMessenger> messenger, NSError** error);

@class MobileMessenger;

@interface MobileMessenger : NSObject <goSeqRefInterface, MobileMessenger> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (void)notify:(MobileEvent*)event;
@end

#endif
