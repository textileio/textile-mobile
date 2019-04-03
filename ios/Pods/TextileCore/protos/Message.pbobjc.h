// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: message.proto

// This CPP symbol can be defined to use imports that match up to the framework
// imports needed when using CocoaPods.
#if !defined(GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS)
 #define GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS 0
#endif

#if GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS
 #import <Protobuf/GPBProtocolBuffers.h>
#else
 #import "GPBProtocolBuffers.h"
#endif

#if GOOGLE_PROTOBUF_OBJC_VERSION < 30002
#error This file was generated by a newer version of protoc which is incompatible with your Protocol Buffer library sources.
#endif
#if 30002 < GOOGLE_PROTOBUF_OBJC_MIN_SUPPORTED_VERSION
#error This file was generated by an older version of protoc which is incompatible with your Protocol Buffer library sources.
#endif

// @@protoc_insertion_point(imports)

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

CF_EXTERN_C_BEGIN

@class GPBAny;
@class Message;

NS_ASSUME_NONNULL_BEGIN

#pragma mark - Enum Message_Type

typedef GPB_ENUM(Message_Type) {
  /**
   * Value used if any message's field encounters a value that is not defined
   * by this enum. The message will also have C functions to get/set the rawValue
   * of the field.
   **/
  Message_Type_GPBUnrecognizedEnumeratorValue = kGPBUnrecognizedEnumeratorValue,
  Message_Type_Ping = 0,
  Message_Type_Pong = 1,
  Message_Type_ThreadEnvelope = 10,
  Message_Type_CafeChallenge = 50,
  Message_Type_CafeNonce = 51,
  Message_Type_CafeRegistration = 52,
  Message_Type_CafeDeregistration = 72,
  Message_Type_CafeDeregistrationAck = 73,
  Message_Type_CafeSession = 53,
  Message_Type_CafeRefreshSession = 54,
  Message_Type_CafeStore = 55,
  Message_Type_CafeStoreAck = 59,
  Message_Type_CafeUnstore = 74,
  Message_Type_CafeUnstoreAck = 75,
  Message_Type_CafeObject = 56,
  Message_Type_CafeObjectList = 57,
  Message_Type_CafeStoreThread = 58,
  Message_Type_CafeStoreThreadAck = 76,
  Message_Type_CafeUnstoreThread = 77,
  Message_Type_CafeUnstoreThreadAck = 78,
  Message_Type_CafeDeliverMessage = 60,
  Message_Type_CafeCheckMessages = 61,
  Message_Type_CafeMessages = 62,
  Message_Type_CafeDeleteMessages = 63,
  Message_Type_CafeDeleteMessagesAck = 64,
  Message_Type_CafeYouHaveMail = 65,
  Message_Type_CafePublishPeer = 66,
  Message_Type_CafePublishPeerAck = 67,
  Message_Type_CafeQuery = 70,
  Message_Type_CafeQueryRes = 71,
  Message_Type_CafePubsubQuery = 102,
  Message_Type_CafePubsubQueryRes = 103,
  Message_Type_Error = 500,
  Message_Type_CafeContactQuery GPB_DEPRECATED_MSG("Message.CAFE_CONTACT_QUERY is deprecated (see message.proto).") = 68,
  Message_Type_CafeContactQueryRes GPB_DEPRECATED_MSG("Message.CAFE_CONTACT_QUERY_RES is deprecated (see message.proto).") = 69,
  Message_Type_CafePubsubContactQuery GPB_DEPRECATED_MSG("Message.CAFE_PUBSUB_CONTACT_QUERY is deprecated (see message.proto).") = 100,
  Message_Type_CafePubsubContactQueryRes GPB_DEPRECATED_MSG("Message.CAFE_PUBSUB_CONTACT_QUERY_RES is deprecated (see message.proto).") = 101,
};

GPBEnumDescriptor *Message_Type_EnumDescriptor(void);

/**
 * Checks to see if the given value is defined by the enum or was not known at
 * the time this source was generated.
 **/
BOOL Message_Type_IsValidValue(int32_t value);

#pragma mark - MessageRoot

/**
 * Exposes the extension registry for this file.
 *
 * The base class provides:
 * @code
 *   + (GPBExtensionRegistry *)extensionRegistry;
 * @endcode
 * which is a @c GPBExtensionRegistry that includes all the extensions defined by
 * this file and all files that it depends on.
 **/
@interface MessageRoot : GPBRootObject
@end

#pragma mark - Message

typedef GPB_ENUM(Message_FieldNumber) {
  Message_FieldNumber_Type = 1,
  Message_FieldNumber_Payload = 2,
  Message_FieldNumber_RequestId = 3,
  Message_FieldNumber_IsResponse = 4,
};

@interface Message : GPBMessage

@property(nonatomic, readwrite) Message_Type type;

@property(nonatomic, readwrite, strong, null_resettable) GPBAny *payload;
/** Test to see if @c payload has been set. */
@property(nonatomic, readwrite) BOOL hasPayload;

/** optional */
@property(nonatomic, readwrite) int32_t requestId;

/** optional */
@property(nonatomic, readwrite) BOOL isResponse;

@end

/**
 * Fetches the raw value of a @c Message's @c type property, even
 * if the value was not defined by the enum at the time the code was generated.
 **/
int32_t Message_Type_RawValue(Message *message);
/**
 * Sets the raw value of an @c Message's @c type property, allowing
 * it to be set to a value that was not defined by the enum at the time the code
 * was generated.
 **/
void SetMessage_Type_RawValue(Message *message, int32_t value);

#pragma mark - Envelope

typedef GPB_ENUM(Envelope_FieldNumber) {
  Envelope_FieldNumber_Message = 1,
  Envelope_FieldNumber_Sig = 2,
};

@interface Envelope : GPBMessage

@property(nonatomic, readwrite, strong, null_resettable) Message *message;
/** Test to see if @c message has been set. */
@property(nonatomic, readwrite) BOOL hasMessage;

@property(nonatomic, readwrite, copy, null_resettable) NSData *sig;

@end

#pragma mark - Error

typedef GPB_ENUM(Error_FieldNumber) {
  Error_FieldNumber_Code = 1,
  Error_FieldNumber_Message = 2,
};

@interface Error : GPBMessage

@property(nonatomic, readwrite) uint32_t code;

@property(nonatomic, readwrite, copy, null_resettable) NSString *message;

@end

NS_ASSUME_NONNULL_END

CF_EXTERN_C_END

#pragma clang diagnostic pop

// @@protoc_insertion_point(global_scope)
