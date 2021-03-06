// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: threads_service.proto

// This CPP symbol can be defined to use imports that match up to the framework
// imports needed when using CocoaPods.
#if !defined(GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS)
 #define GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS 0
#endif

#if GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS
 #import <Protobuf/GPBProtocolBuffers_RuntimeSupport.h>
#else
 #import "GPBProtocolBuffers_RuntimeSupport.h"
#endif

#import "ThreadsService.pbobjc.h"
#import "Model.pbobjc.h"
// @@protoc_insertion_point(imports)

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

#pragma mark - ThreadsServiceRoot

@implementation ThreadsServiceRoot

// No extensions in the file and none of the imports (direct or indirect)
// defined extensions, so no need to generate +extensionRegistry.

@end

#pragma mark - ThreadsServiceRoot_FileDescriptor

static GPBFileDescriptor *ThreadsServiceRoot_FileDescriptor(void) {
  // This is called by +initialize so there is no need to worry
  // about thread safety of the singleton.
  static GPBFileDescriptor *descriptor = NULL;
  if (!descriptor) {
    GPB_DEBUG_CHECK_RUNTIME_VERSIONS();
    descriptor = [[GPBFileDescriptor alloc] initWithPackage:@""
                                                     syntax:GPBFileSyntaxProto3];
  }
  return descriptor;
}

#pragma mark - ThreadEnvelope

@implementation ThreadEnvelope

@dynamic thread;
@dynamic hash_p;
@dynamic ciphertext;
@dynamic sig;
@dynamic node;
@dynamic block;

typedef struct ThreadEnvelope__storage_ {
  uint32_t _has_storage_[1];
  NSString *thread;
  NSString *hash_p;
  NSData *ciphertext;
  NSData *sig;
  NSData *node;
  NSData *block;
} ThreadEnvelope__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "thread",
        .dataTypeSpecific.className = NULL,
        .number = ThreadEnvelope_FieldNumber_Thread,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadEnvelope__storage_, thread),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
      {
        .name = "hash_p",
        .dataTypeSpecific.className = NULL,
        .number = ThreadEnvelope_FieldNumber_Hash_p,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(ThreadEnvelope__storage_, hash_p),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
      {
        .name = "ciphertext",
        .dataTypeSpecific.className = NULL,
        .number = ThreadEnvelope_FieldNumber_Ciphertext,
        .hasIndex = 2,
        .offset = (uint32_t)offsetof(ThreadEnvelope__storage_, ciphertext),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeBytes,
      },
      {
        .name = "sig",
        .dataTypeSpecific.className = NULL,
        .number = ThreadEnvelope_FieldNumber_Sig,
        .hasIndex = 3,
        .offset = (uint32_t)offsetof(ThreadEnvelope__storage_, sig),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeBytes,
      },
      {
        .name = "node",
        .dataTypeSpecific.className = NULL,
        .number = ThreadEnvelope_FieldNumber_Node,
        .hasIndex = 4,
        .offset = (uint32_t)offsetof(ThreadEnvelope__storage_, node),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeBytes,
      },
      {
        .name = "block",
        .dataTypeSpecific.className = NULL,
        .number = ThreadEnvelope_FieldNumber_Block,
        .hasIndex = 5,
        .offset = (uint32_t)offsetof(ThreadEnvelope__storage_, block),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeBytes,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadEnvelope class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadEnvelope__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - ThreadEnvelopeAck

@implementation ThreadEnvelopeAck

@dynamic id_p;

typedef struct ThreadEnvelopeAck__storage_ {
  uint32_t _has_storage_[1];
  NSString *id_p;
} ThreadEnvelopeAck__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "id_p",
        .dataTypeSpecific.className = NULL,
        .number = ThreadEnvelopeAck_FieldNumber_Id_p,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadEnvelopeAck__storage_, id_p),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadEnvelopeAck class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadEnvelopeAck__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - ThreadBlock

@implementation ThreadBlock

@dynamic hasHeader, header;
@dynamic type;
@dynamic hasPayload, payload;

typedef struct ThreadBlock__storage_ {
  uint32_t _has_storage_[1];
  Block_BlockType type;
  ThreadBlockHeader *header;
  GPBAny *payload;
} ThreadBlock__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "header",
        .dataTypeSpecific.className = GPBStringifySymbol(ThreadBlockHeader),
        .number = ThreadBlock_FieldNumber_Header,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadBlock__storage_, header),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "type",
        .dataTypeSpecific.enumDescFunc = Block_BlockType_EnumDescriptor,
        .number = ThreadBlock_FieldNumber_Type,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(ThreadBlock__storage_, type),
        .flags = (GPBFieldFlags)(GPBFieldOptional | GPBFieldHasEnumDescriptor),
        .dataType = GPBDataTypeEnum,
      },
      {
        .name = "payload",
        .dataTypeSpecific.className = GPBStringifySymbol(GPBAny),
        .number = ThreadBlock_FieldNumber_Payload,
        .hasIndex = 2,
        .offset = (uint32_t)offsetof(ThreadBlock__storage_, payload),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadBlock class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadBlock__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

int32_t ThreadBlock_Type_RawValue(ThreadBlock *message) {
  GPBDescriptor *descriptor = [ThreadBlock descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:ThreadBlock_FieldNumber_Type];
  return GPBGetMessageInt32Field(message, field);
}

void SetThreadBlock_Type_RawValue(ThreadBlock *message, int32_t value) {
  GPBDescriptor *descriptor = [ThreadBlock descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:ThreadBlock_FieldNumber_Type];
  GPBSetInt32IvarWithFieldInternal(message, field, value, descriptor.file.syntax);
}

#pragma mark - ThreadBlockHeader

@implementation ThreadBlockHeader

@dynamic hasDate, date;
@dynamic parentsArray, parentsArray_Count;
@dynamic author;
@dynamic address;

typedef struct ThreadBlockHeader__storage_ {
  uint32_t _has_storage_[1];
  GPBTimestamp *date;
  NSMutableArray *parentsArray;
  NSString *author;
  NSString *address;
} ThreadBlockHeader__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "date",
        .dataTypeSpecific.className = GPBStringifySymbol(GPBTimestamp),
        .number = ThreadBlockHeader_FieldNumber_Date,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadBlockHeader__storage_, date),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "parentsArray",
        .dataTypeSpecific.className = NULL,
        .number = ThreadBlockHeader_FieldNumber_ParentsArray,
        .hasIndex = GPBNoHasBit,
        .offset = (uint32_t)offsetof(ThreadBlockHeader__storage_, parentsArray),
        .flags = GPBFieldRepeated,
        .dataType = GPBDataTypeString,
      },
      {
        .name = "author",
        .dataTypeSpecific.className = NULL,
        .number = ThreadBlockHeader_FieldNumber_Author,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(ThreadBlockHeader__storage_, author),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
      {
        .name = "address",
        .dataTypeSpecific.className = NULL,
        .number = ThreadBlockHeader_FieldNumber_Address,
        .hasIndex = 2,
        .offset = (uint32_t)offsetof(ThreadBlockHeader__storage_, address),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadBlockHeader class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadBlockHeader__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - ThreadAdd

@implementation ThreadAdd

@dynamic hasInviter, inviter;
@dynamic hasThread, thread;
@dynamic invitee;

typedef struct ThreadAdd__storage_ {
  uint32_t _has_storage_[1];
  Peer *inviter;
  Thread *thread;
  NSString *invitee;
} ThreadAdd__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "inviter",
        .dataTypeSpecific.className = GPBStringifySymbol(Peer),
        .number = ThreadAdd_FieldNumber_Inviter,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadAdd__storage_, inviter),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "thread",
        .dataTypeSpecific.className = GPBStringifySymbol(Thread),
        .number = ThreadAdd_FieldNumber_Thread,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(ThreadAdd__storage_, thread),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "invitee",
        .dataTypeSpecific.className = NULL,
        .number = ThreadAdd_FieldNumber_Invitee,
        .hasIndex = 2,
        .offset = (uint32_t)offsetof(ThreadAdd__storage_, invitee),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadAdd class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadAdd__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - ThreadIgnore

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-implementations"

@implementation ThreadIgnore

@dynamic target;

typedef struct ThreadIgnore__storage_ {
  uint32_t _has_storage_[1];
  NSString *target;
} ThreadIgnore__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "target",
        .dataTypeSpecific.className = NULL,
        .number = ThreadIgnore_FieldNumber_Target,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadIgnore__storage_, target),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadIgnore class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadIgnore__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma clang diagnostic pop

#pragma mark - ThreadFlag

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-implementations"

@implementation ThreadFlag

@dynamic target;

typedef struct ThreadFlag__storage_ {
  uint32_t _has_storage_[1];
  NSString *target;
} ThreadFlag__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "target",
        .dataTypeSpecific.className = NULL,
        .number = ThreadFlag_FieldNumber_Target,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadFlag__storage_, target),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadFlag class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadFlag__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma clang diagnostic pop

#pragma mark - ThreadJoin

@implementation ThreadJoin

@dynamic inviter;
@dynamic hasPeer, peer;

typedef struct ThreadJoin__storage_ {
  uint32_t _has_storage_[1];
  NSString *inviter;
  Peer *peer;
} ThreadJoin__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "inviter",
        .dataTypeSpecific.className = NULL,
        .number = ThreadJoin_FieldNumber_Inviter,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadJoin__storage_, inviter),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
      {
        .name = "peer",
        .dataTypeSpecific.className = GPBStringifySymbol(Peer),
        .number = ThreadJoin_FieldNumber_Peer,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(ThreadJoin__storage_, peer),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadJoin class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadJoin__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - ThreadAnnounce

@implementation ThreadAnnounce

@dynamic hasPeer, peer;
@dynamic name;

typedef struct ThreadAnnounce__storage_ {
  uint32_t _has_storage_[1];
  Peer *peer;
  NSString *name;
} ThreadAnnounce__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "peer",
        .dataTypeSpecific.className = GPBStringifySymbol(Peer),
        .number = ThreadAnnounce_FieldNumber_Peer,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadAnnounce__storage_, peer),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "name",
        .dataTypeSpecific.className = NULL,
        .number = ThreadAnnounce_FieldNumber_Name,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(ThreadAnnounce__storage_, name),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadAnnounce class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadAnnounce__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - ThreadMessage

@implementation ThreadMessage

@dynamic body;

typedef struct ThreadMessage__storage_ {
  uint32_t _has_storage_[1];
  NSString *body;
} ThreadMessage__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "body",
        .dataTypeSpecific.className = NULL,
        .number = ThreadMessage_FieldNumber_Body,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadMessage__storage_, body),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadMessage class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadMessage__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - ThreadFiles

@implementation ThreadFiles

@dynamic target;
@dynamic body;
@dynamic keys, keys_Count;

typedef struct ThreadFiles__storage_ {
  uint32_t _has_storage_[1];
  NSString *target;
  NSString *body;
  NSMutableDictionary *keys;
} ThreadFiles__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "target",
        .dataTypeSpecific.className = NULL,
        .number = ThreadFiles_FieldNumber_Target,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadFiles__storage_, target),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
      {
        .name = "body",
        .dataTypeSpecific.className = NULL,
        .number = ThreadFiles_FieldNumber_Body,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(ThreadFiles__storage_, body),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
      {
        .name = "keys",
        .dataTypeSpecific.className = NULL,
        .number = ThreadFiles_FieldNumber_Keys,
        .hasIndex = GPBNoHasBit,
        .offset = (uint32_t)offsetof(ThreadFiles__storage_, keys),
        .flags = GPBFieldMapKeyString,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadFiles class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadFiles__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - ThreadComment

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-implementations"

@implementation ThreadComment

@dynamic target;
@dynamic body;

typedef struct ThreadComment__storage_ {
  uint32_t _has_storage_[1];
  NSString *target;
  NSString *body;
} ThreadComment__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "target",
        .dataTypeSpecific.className = NULL,
        .number = ThreadComment_FieldNumber_Target,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadComment__storage_, target),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
      {
        .name = "body",
        .dataTypeSpecific.className = NULL,
        .number = ThreadComment_FieldNumber_Body,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(ThreadComment__storage_, body),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadComment class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadComment__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma clang diagnostic pop

#pragma mark - ThreadLike

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-implementations"

@implementation ThreadLike

@dynamic target;

typedef struct ThreadLike__storage_ {
  uint32_t _has_storage_[1];
  NSString *target;
} ThreadLike__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "target",
        .dataTypeSpecific.className = NULL,
        .number = ThreadLike_FieldNumber_Target,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(ThreadLike__storage_, target),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[ThreadLike class]
                                     rootClass:[ThreadsServiceRoot class]
                                          file:ThreadsServiceRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(ThreadLike__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma clang diagnostic pop


#pragma clang diagnostic pop

// @@protoc_insertion_point(global_scope)
